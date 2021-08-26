import { useDebounceFn, useThrottleFn } from '@vueuse/core'

export const createMiddleware = (
  middleware,
  { debounce, throttle } = { debounce: 0, throttle: 0 },
) => {
  if (!(middleware instanceof Function))
    throw new Error(
      `[ MIDDLEWARE ]: middleware must be a function, ${typeof middleware} given`,
    )

  let middlewareWrap = middleware
  if (debounce > 0) middlewareWrap = useDebounceFn(middlewareWrap, debounce)
  if (throttle > 0) middlewareWrap = useThrottleFn(middlewareWrap, throttle)

  return (page) => {
    return middlewareWrap(page)
  }
}

export { default as getUser } from './getUser'
export { default as isAdmin } from './isAdmin'
export { default as isAuthenticated } from './isAuthenticated'
export { default as isOwnerOfIdea } from './isOwnerOfIdea'
