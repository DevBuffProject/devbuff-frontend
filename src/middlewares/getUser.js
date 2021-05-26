import { useThrottleFn } from '@vueuse/core'
import { useAuth, useUser } from '../composes/core'
import { useGlobalState } from '../store'

const state = useGlobalState()
const { getUser } = useUser()
const { isLoggedIn, checkAuth, refreshTokens } = useAuth()

export default useThrottleFn(async (to, from, next) => {
  if (!isLoggedIn.value) return next()
  const check = await checkAuth()
  if (!check.active) await refreshTokens()
  const { data: user } = await getUser()
  state.value.user = user

  next()
}, 1000 * 5)
