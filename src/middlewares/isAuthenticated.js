import { useAuth } from '../composes'

export default async (route) => {
  if (route.meta.preview !== undefined && route.params._isDialog === 'true') {
    return true
  }

  return useAuth().isLoggedIn.value
}
