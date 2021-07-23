<template>
  <div>
    <LayoutHeader class="fixed w-full top-0 left-0 z-50" />
    <div class="my-26">
      <div class="grid grid-cols-10 gap-8 container mx-auto">
        <LayoutSidebar class="col-span-2 h-min sticky top-26" />
        <div class="col-span-8">
          <router-view :route="mainRoute" v-slot="{ Component, route }">
            <template v-if="Component">
              <suspense>
                <div class="h-full container" :key="route.name">
                  <AtomicBreadcrumbs
                    v-if="route?.meta.breadcrumbs"
                    :items="breadcrumbs"
                  />
                  <h2 class="sticky top-3 z-50 inline-block">
                    {{ route.meta.name }}
                  </h2>
                  <component :is="Component" />
                </div>
                <template #fallback>
                  <div>
                    <div class="flex items-center">
                      <AtomicSkeleton class="w-[80px] mr-4" />
                      <AtomicSkeleton class="w-[120px]" />
                    </div>

                    <AtomicSkeleton
                      class="!w-[200px] !h-[40px] !rounded-md mt-4"
                    />
                  </div>
                </template>
              </suspense>
            </template>
          </router-view>
        </div>
      </div>
    </div>

    <router-view
      v-if="isDialog"
      :route="dialogRoute"
      v-slot="{ Component: Dialog }"
    >
      <suspense v-if="Dialog">
        <AtomicDialog visible @close="back">
          <component :is="dialogRoute?.meta.preview || Dialog" />
        </AtomicDialog>

        <template #fallback>
          <AtomicLoadingOverlay visible @close="back" />
        </template>
      </suspense>
    </router-view>
  </div>
</template>

<script>
import { defineComponent, ref, provide, computed, onErrorCaptured } from 'vue'
import { set, useTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useAuth } from './composes/core'

export default defineComponent({
  setup() {
    useTitle('DefBuff')
    const router = useRouter()

    const { isLoggedIn, isAdmin } = useAuth()
    // fix vue-router
    const breadcrumbs = computed(() => {
      const breadcrumbs = mainRoute.value?.meta.breadcrumbs || []
      const crumbRoutes = router.options.routes
        .filter((r) => breadcrumbs?.includes(r.name))
        .map((r) => ({ title: r.meta?.name, to: r.path }))
      return [...crumbRoutes, { title: mainRoute.value.meta.name }]
    })
    const mainRoute = ref({ matched: [] })
    const dialogRoute = ref(null)
    const isDialog = ref(false)
    provide('route', { main: mainRoute, dialog: dialogRoute })
    router.beforeResolve((to, from, next) => {
      set(isDialog, Boolean(to.params._isDialog))
      set(dialogRoute, isDialog.value ? to : null)
      // Prevent reactive triggers if background route isn't changed
      const bgRoute = isDialog.value ? from : to
      if (mainRoute.value.fullPath !== bgRoute.fullPath) set(mainRoute, bgRoute)
      next()
    })

    const error = ref(null)
    const isPageLoading = ref(false)
    provide('isPageLoading', isPageLoading)
    onErrorCaptured((err) => (error.value = err))
    router.beforeResolve(() => {
      NProgress.start()
      set(isPageLoading, true)
    })
    router.afterEach(() =>
      setTimeout(() => {
        NProgress.done()
        NProgress.remove()
        set(isPageLoading, false)
      }, 100),
    )

    router.beforeEach(async (to, from, next) => {
      if (!(to.meta.middleware instanceof Function)) {
        //Ignore page without required middleware
        next()
      } else {
        let resultMiddleware = await to.meta.middleware.call(this, to)
        console.log('Result of middleware', resultMiddleware)
        if (resultMiddleware === false) {
          next({
            name: 'explore',
            query: {
              missingAuthorization: true,
            },
          })
        } else {
          next()
        }
      }
    })

    const back = () => router.back()

    return {
      isDialog,
      mainRoute,
      dialogRoute,
      breadcrumbs,
      isPageLoading,
      error,
      back,
    }
  },
})
</script>
