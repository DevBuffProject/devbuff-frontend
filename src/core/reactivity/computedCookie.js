import { useCookies } from '@vueuse/integrations'
import { computed } from 'vue'

export const computedCookie = (name) => {
  const _cookieOptions = { SameSite: 'Lax', path: '/' }
  const _cookies = useCookies(['access_token', 'refresh_token'], {
    autoUpdateDependencies: true,
  })
  const _setCookie = (name, value, expires) =>
    _cookies.set(name, value, { ..._cookieOptions, expires })
  const _removeCookie = (name) => _cookies.remove(name, _cookieOptions)

  return computed({
    get: () => _cookies.get('access_token'),
    set: (obj) => {
      !(typeof obj === 'object' && obj.value)
        ? _removeCookie(name)
        : _setCookie(name, obj.value, obj.expires)
    },
  })
}
