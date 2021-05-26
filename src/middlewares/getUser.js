import { useThrottleFn } from '@vueuse/core'
import { useAuth, useUser } from '../composes/core'
import { useGlobalState } from '../store'

const state = useGlobalState()
const { getUser } = useUser()
const { isLoggedIn, check, refresh, logout } = useAuth()

export default useThrottleFn(async () => {
  if (!isLoggedIn.value) return false

  try {
    const status = await check()

    if (!status.active) await refresh()

    const { data: user } = await getUser()
    state.value.user = user
  } catch (e) {
    console.log('remove', e)
    state.value.user = {}
    logout()
  }
}, 1000 * 5)
