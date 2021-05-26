import { useCookies } from '@vueuse/integrations'
import { useApi } from './useApi'
import { computed } from 'vue'
import { not } from '@vueuse/core'

const PROVIDERS = {
  GitHub: 'GitHub',
  GitLab: 'GitLab',
}

const { request } = useApi()
const cookies = useCookies([])

const tokens = computed(() => ({
  accessToken: cookies.get('access_token'),
  refreshToken: cookies.get('refresh_token'),
}))
const isLoggedIn = computed(
  () => !!(tokens.value.accessToken || tokens.value.refreshToken),
)

const initAuth = (provider) => {
  if (!PROVIDERS[provider]) throw Error(`Unknown auth provider "${provider}"`)
  window.location.href = `${
    import.meta.env.VITE_API_BASE_URL
  }/oAuth/${provider}`
}
const getTokens = async ({ code, provider }) => {
  if (!PROVIDERS[provider]) throw Error(`Unknown auth provider "${provider}"`)
  const credentials = new URLSearchParams()
  credentials.set('code', code)
  credentials.set('grant_type', provider.toLowerCase() + '_oauth')
  const response = await request({
    url: '/oAuth',
    method: 'post',
    data: credentials,
  })
  saveTokens(response.data)
  return response
}
const refreshTokens = async () => {
  if (not(isLoggedIn) || not(isLoggedIn)) return false

  const credentials = new URLSearchParams()
  credentials.set('refresh_token', tokens.value.refreshToken)
  credentials.set('grant_type', 'refresh_token')
  const response = await request({ url: 'oAuth/update', data: credentials })
  saveTokens(response.data)
  return response
}
const saveTokens = ({ expires_in, access_token, refresh_token }) => {
  if (!(access_token && refresh_token && expires_in)) return
  const now = new Date()
  const tokenExpires = new Date(
    new Date().setSeconds(now.getSeconds() + expires_in),
  )
  const refreshExpires = new Date(new Date().setMonth(now.getMonth() + 1))
  const cookieBaseOptions = {
    SameSite: 'Lax',
    path: '/',
  }
  cookies.set('access_token', access_token, {
    ...cookieBaseOptions,
    expires: tokenExpires,
  })
  cookies.set('refresh_token', refresh_token, {
    ...cookieBaseOptions,
    expires: refreshExpires,
  })
}
const checkAuth = async () => {
  const credentials = new URLSearchParams()
  credentials.set('token', tokens.value.accessToken)
  const response = await request({
    url: 'oAuth/check',
    method: 'post',
    data: credentials,
  })

  return response.data
}

export const useAuth = () => ({
  PROVIDERS,
  tokens,
  isLoggedIn,
  initAuth,
  getTokens,
  refreshTokens,
  checkAuth,
})
