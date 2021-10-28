import { useAuth } from '../composes'

export default {
  install() {
    const { isLoggedIn, getStatus, getUser } = useAuth()
    if (isLoggedIn.value) {
      getStatus()
      getUser()
    }
  },
}
