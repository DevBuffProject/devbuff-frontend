import { useCookies } from '@vueuse/integrations'
import { useApi } from './useApi'
import { computed, ref } from 'vue'

const PROVIDERS = {
  GitHub: 'GitHub',
  GitLab: 'GitLab',
}

const { request } = useApi()
const cookies = useCookies(['access_token', 'refresh_token'], {
  autoUpdateDependencies: true,
})
const cookieBaseOptions = { SameSite: 'Lax', path: '/' }

const tokens = computed(() => {
  return {
    accessToken: cookies.get('access_token'),
    refreshToken: cookies.get('refresh_token'),
  }
})
const isLoggedIn = computed(
  () => !!(tokens.value.accessToken || tokens.value.refreshToken),
)

const isAdmin = ref(false)

const initAuth = (provider) => {
  if (!PROVIDERS[provider]) throw Error(`Unknown auth provider "${provider}"`)
  window.location.href = `${
    import.meta.env.VITE_API_BASE_URL
  }/oAuth/${provider}`
}
const auth = async ({ code, provider }) => {
  if (!PROVIDERS[provider]) throw Error(`Unknown auth provider "${provider}"`)
  const credentials = new URLSearchParams()
  credentials.set('code', code)
  credentials.set('grant_type', `${provider.toLowerCase()}_oauth`)
  const response = await request({
    url: '/oAuth',
    method: 'post',
    data: credentials,
  })
  saveTokens(response.data)
  return response
}
const refresh = async () => {
  if (!isLoggedIn.value) return false

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
  cookies.set('access_token', access_token, {
    ...cookieBaseOptions,
    expires: tokenExpires,
  })
  cookies.set('refresh_token', refresh_token, {
    ...cookieBaseOptions,
    expires: refreshExpires,
  })
}
const check = async () => {
  const credentials = new URLSearchParams()
  credentials.set('token', tokens.value.accessToken)
  const response = await request({
    url: 'oAuth/check',
    method: 'post',
    data: credentials,
  })
  if (response.data?.authorities?.indexOf('ROLE_ADMIN') !== -1) {
    isAdmin.value = true
  }
  return response.data
}
const logout = () => {
  cookies.remove('access_token', cookieBaseOptions)
  cookies.remove('refresh_token', cookieBaseOptions)
  isAdmin.value = false
}

export const useAuth = () => ({
  PROVIDERS,
  tokens,
  isLoggedIn,
  isAdmin,
  initAuth,
  auth,
  refresh,
  check,
  logout,
})
