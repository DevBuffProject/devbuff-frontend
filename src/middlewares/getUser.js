import { useAuth, useUser } from '../composes/core'
import { useGlobalState } from '../store'

const state = useGlobalState()
const { getUser } = useUser()
const { isLoggedIn, check, refresh, logout } = useAuth()

export default async () => {
  if (!isLoggedIn.value) return false

  try {
    const status = await check()
    console.log(status)
    if (!status.active) await refresh()

    const { data: user } = await getUser()
    state.value.user = {
      ...user,
      avatar: `${import.meta.env.VITE_API_BASE_URL}/photo/profile/${user.id}`,
    }
  } catch (e) {
    state.value.user = {}
    logout()
  }
}
