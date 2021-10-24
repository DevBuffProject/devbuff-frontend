import { inject, readonly, ref, shallowRef } from 'vue'
import { createRouter as createVueRouter } from 'vue-router'
import { set, useStorage } from '@vueuse/core'
import { dialogRouteSymbol, mainRouteSymbol, routerSymbol } from './symbols'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const mainRoute = shallowRef({ matched: [] })
const dialogRoute = shallowRef({ matched: [] })
const isDialog = ref(false)

const setupHooks = (router) => {
  // await https://github.com/vuejs/vue-router-next/issues/1048
  const resolveRoute = async (route) => {
    const resolved = shallowRef(router.resolve(route))
    let component = resolved.value.matched[0].components.default
    if (component instanceof Function) {
      component = await component()
      resolved.value.matched[0].components.default = component.default
    }
    return resolved.value
  }

  let visited = false
  const lastRoute = useStorage('last-route', 'explore')
  router.afterEach((to, from) => {
    setTimeout(NProgress.done, 100)
    if (visited) set(lastRoute, to.name)
    visited = true
  })

  router.beforeResolve(async (to, from, next) => {
    set(isDialog, !!(to.meta.isDialog || to.params._isDialog))
    if (isDialog.value) {
      const fallbackRoute = await resolveRoute({ name: 'explore' })

      set(dialogRoute, to)
      if (!mainRoute.value.matched.length) set(mainRoute, fallbackRoute)
    } else {
      set(dialogRoute, undefined)

      if (mainRoute.value?.fullPath !== to.fullPath) {
        NProgress.start()
        set(mainRoute, to)
      }
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
