import {
  useBreakpoints as breakpoints,
  breakpointsTailwind,
} from '@vueuse/core'

export const useBreakpoints = () => {
  const points = breakpoints(breakpointsTailwind)
  const sm = points.smaller('sm')
  const md = points.between('sm', 'md')
  const lg = points.between('md', 'lg')
  const xl = points.between('lg', 'xl')
  const xxl = points.between('xl', '2xl')

  return {
    sm,
    md,
    lg,
    xl,
    xxl,
    ...points,
  }
}
