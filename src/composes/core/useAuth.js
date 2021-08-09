import { useCookies } from '@vueuse/integrations'
import { useApi } from './useApi'
import { computed, readonly, ref } from 'vue'
import { useUser } from './useUser'
import { get, not, or, set } from '@vueuse/core'
import { computedCookie } from '../../core/reactivity'

const ROLE_ADMIN = 'ROLE_ADMIN'
const ROLE_USER = 'ROLE_USER'
const PROVIDERS = Object.freeze({
  GitHub: 'GitHub',
  GitLab: 'GitLab',
  get(type) {
    if (!this[type]) throw new Error(`Incorrect grant type: ${type}`)
    return this[type]
  },
})

const _saveTokens = ({ expires_in, access_token, refresh_token }) => {
  if (!(access_token && refresh_token && expires_in)) return

  const now = new Date()
  set(refreshToken, {
    value: refresh_token,
    expires: new Date(new Date().setMonth(now.getMonth() + 1)),
  })
  set(accessToken, {
    value: access_token,
    expires: new Date(new Date().setSeconds(now.getSeconds() + expires_in)),
  })
}

const accessToken = computedCookie('access_token')
const refreshToken = computedCookie('refreshToken')
const isLoggedIn = or(accessToken, refreshToken)
const needsRefresh = not(accessToken.value)
const status = ref({ active: false })
const isAdmin = computed(
  () =>
    get(status, 'active') && get(status, 'authorities').includes(ROLE_ADMIN),
)
export const useAuth = () => {
  const { request, ...rest } = useApi()

  const initAuth = (provider) => {
    const { BASE_URL } = useApi()
    window.location.href = `${BASE_URL}/oAuth/${PROVIDERS.get(provider)}`
  }

  const auth = async ({ code, provider }) => {
    try {
      const { data } = await request({
        url: '/oAuth',
        method: 'post',
        data: new URLSearchParams({
          code,
          grant_type: `${PROVIDERS.get(provider)}_oauth`,
        }),
      })

      _saveTokens(data)
      await getStatus()
      await useUser().getUser()

      return data
    } catch (e) {
      console.error(e)
    }
  }

  const refresh = async () => {
    if (!isLoggedIn.value) throw new Error('No tokens for refresh session')

    try {
      const { data } = await request({
        url: 'oAuth/update',
        data: new URLSearchParams({
          refresh_token: get(refreshToken),
          grant_type: 'refresh_token',
        }),
      })

      _saveTokens(data)
      return data
    } catch (e) {
      console.error(e)
    }
  }

  const getStatus = async () => {
    try {
      const { data } = await request({
        url: 'oAuth/check',
        method: 'post',
        data: new URLSearchParams({ token: get(accessToken) }),
      })

      set(status, data)
      return data
    } catch (e) {
      console.error(e)
    }
  }

  const logout = () =>
    set(accessToken, undefined) ||
    set(refreshToken, undefined) ||
    set(status, { active: false })

  return {
    PROVIDERS,
    ROLE_ADMIN,
    ROLE_USER,
    status: readonly(status),
    accessToken: readonly(accessToken),
    refreshToken: readonly(refreshToken),
    isLoggedIn,
    isAdmin,
    needsRefresh,
    initAuth,
    auth,
    refresh,
    getStatus,
    logout,
  }
}
