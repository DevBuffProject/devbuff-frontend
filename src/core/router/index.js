import { inject, ref, shallowRef } from 'vue'
import { createRouter as createVueRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { dialogRouteSymbol, mainRouteSymbol, routerSymbol } from './symbols'
import { progress } from '../ui/LoadingIndicator'

const mainRoute = shallowRef({ matched: [] })
const dialogRoute = shallowRef({ matched: [] })
const isDialog = ref(false)
const isMainRouteLoading = ref(false)
const isDialogRouteLoading = ref(false)
const lastRoute = useStorage('last-route', 'explore')

const startLoaders = () => {
  if (isDialog.value) isDialogRouteLoading.value = true
  else isMainRouteLoading.value = true
  progress.start()
}

const stopLoaders = () => {
  isDialogRouteLoading.value = false
  isMainRouteLoading.value = false
  progress.done()
}

const setupHooks = (router) => {
  // await https://github.com/vuejs/vue-router-next/issues/1048
  const resolveRoute = async (route) => {
    const resolved = shallowRef(router.resolve(route))
    let component = resolved.value.matched[0]?.components.default
    if (component instanceof Function) {
      component = await component()
      resolved.value.matched[0].components.default = component.default
    }

    return resolved.value
  }

  router.beforeEach((to) => {
    isDialog.value = !!(to.meta.isDialog || to.params._isDialog)
    startLoaders()
  })

  router.afterEach(() => {
    lastRoute.value = mainRoute.value.fullPath
    stopLoaders()
  })

  router.afterEach(stopLoaders)

  router.beforeResolve(async (to, from, next) => {
    if (isDialog.value) {
      dialogRoute.value = to
      const fallbackRoute = await resolveRoute(
        lastRoute.value || { name: 'explore' },
      )
      if (!mainRoute.value.matched.length) mainRoute.value = fallbackRoute
    } else {
      dialogRoute.value = undefined
      if (mainRoute.value?.fullPath !== to.fullPath) mainRoute.value = to
    }

    next()
  })
}

export const createOverlayRouter = (options) => {
  const vueRouter = createVueRouter(options)
  const backToMainRoute = async () =>
    await vueRouter.push(mainRoute.value.fullPath)

  setupHooks(vueRouter)

  return {
    install(app) {
      vueRouter.install(app)
      app.provide(routerSymbol, {
        ...vueRouter,
        mainRoute,
        dialogRoute,
        isDialog,
        isDialogRouteLoading,
        isMainRouteLoading,
        backToMainRoute,
      })
      app.provide(mainRouteSymbol, mainRoute)
      app.provide(dialogRouteSymbol, dialogRoute)
    },
  }
}

export const useRouter = () => inject(routerSymbol)
export const useMainRoute = () => inject(mainRouteSymbol)
export const useDialogRoute = () => inject(dialogRouteSymbol)
