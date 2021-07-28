import { inject, ref, shallowRef } from 'vue'
import { createRouter as createVueRouter } from 'vue-router'
import { set, useStorage } from '@vueuse/core'
import { dialogRouteSymbol, mainRouteSymbol, routerSymbol } from './symbols'

export const mainRoute = shallowRef({ matched: [] })
export const dialogRoute = shallowRef({ matched: [] })
const isDialog = ref(false)

const setupHooks = (router) => {
  let visited = false
  const lastRoute = useStorage('last-route', 'explore')
  router.afterEach((to, from) => {
    if (visited) set(lastRoute, to.name)
    visited = true
  })

  // await https://github.com/vuejs/vue-router-next/issues/1048
  const resolveRoute = async (route) => {
    const resolved = router.resolve(route)
    let component = resolved.matched[0].components.default
    if (component instanceof Function) {
      component = await component()
      resolved.matched[0].components.default = component.default
    }
    return resolved
  }

  router.beforeResolve(async (to, from, next) => {
    set(isDialog, to.meta.isDialog || to.params._isDialog)
    if (isDialog.value) {
      const fallbackRoute = await resolveRoute({ name: 'explore' })
      // TODO: resolve last visited route
      // const route = router.resolve({ name: lastRoute.value })
      set(dialogRoute, to)
      if (!mainRoute.value.matched.length) set(mainRoute, fallbackRoute)
    } else {
      set(dialogRoute, null)
      if (mainRoute.value?.fullPath !== to.fullPath) set(mainRoute, to)
    }
    next()
  })
}

export const createOverlayRouter = (options) => {
  const vueRouter = createVueRouter(options)
  setupHooks(vueRouter)

  return {
    ...vueRouter,
    install(app) {
      vueRouter.install(app)

      app.provide(routerSymbol, vueRouter)
      app.provide(mainRouteSymbol, mainRoute)
      app.provide(dialogRouteSymbol, dialogRoute)
    },
  }
}

export const useRouter = () => inject(routerSymbol)
export const useMainRoute = () => inject(mainRouteSymbol)
export const useDialogRoute = () => inject(dialogRouteSymbol)
