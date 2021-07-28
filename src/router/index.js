import { ref, shallowRef } from 'vue'
import { createRouter as createVueRouter } from 'vue-router'
import { set, useStorage } from '@vueuse/core'

export const mainRoute = shallowRef({ matched: [] })
export const dialogRoute = shallowRef({ matched: [] })
export const isDialog = ref(false)

export const createOverlayRouter = (options) => {
  const router = createVueRouter(options)

  const resolveRoute = async (route) => {
    const resolved = router.resolve(route)
    console.log('resolved route', resolved)

    let component = resolved.matched[0].components.default
    if (component instanceof Function) {
      component = await component()
      resolved.matched[0].components.default = component.default
    }
    return resolved
  }

  let visited = false
  const lastRoute = useStorage('last-route', 'explore')
  router.afterEach((to, from) => {
    if (visited) set(lastRoute, to.name)
    visited = true
  })

  router.beforeResolve(async (to, from, next) => {
    set(isDialog, to.meta.isDialog || to.params._isDialog)
    if (isDialog.value) {
      const fallbackRoute = await resolveRoute({ name: 'explore' })
      // const route = router.resolve({ name: lastRoute.value })
      set(dialogRoute, to)
      if (!mainRoute.value.matched.length) set(mainRoute, fallbackRoute)
    } else {
      set(dialogRoute, null)
      if (mainRoute.value?.fullPath !== to.fullPath) set(mainRoute, to)
    }
    console.log('main', mainRoute.value)
    console.log('dialog', dialogRoute.value)
    next()
  })
  return router
}
