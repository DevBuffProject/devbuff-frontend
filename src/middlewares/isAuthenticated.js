import { useAuth } from '../composes/core'

export default async (route) => {
  if (route.meta.preview !== undefined && route.params._isDialog === 'true') {
    return true
  }

  const { isLoggedIn } = useAuth()

  return isLoggedIn.value !== false
}
