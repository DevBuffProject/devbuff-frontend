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
                  <h2
                    class="sticky top-3 z-50 inline-block"
                    v-if="route?.meta.name"
                  >
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
      v-if="dialogRoute"
      :route="dialogRoute"
      v-slot="{ Component, route }"
    >
      <suspense v-if="Component">
        <AtomicDialog visible @close="back">
          <h2 v-if="route?.meta.name" class="mt-2">
            {{ route.meta.name }}
          </h2>
          <component :is="route?.meta.preview || Component" />
        </AtomicDialog>

        <template #fallback>
          <AtomicLoadingOverlay visible @close="back" />
        </template>
      </suspense>
    </router-view>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  provide,
  computed,
  onErrorCaptured,
  defineAsyncComponent,
} from 'vue'
import { get, set, useTitle } from '@vueuse/core'
import { useAuth } from './composes/core'
import { useRouter } from 'vue-router'
import { mainRoute, dialogRoute, isDialog } from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default defineComponent({
  setup() {
    useTitle('DefBuff')
    const router = useRouter()

    const { isLoggedIn, isAdmin } = useAuth()
    const breadcrumbs = computed(() => {
      const breadcrumbs = mainRoute.value?.meta.breadcrumbs || []
      const crumbRoutes = router.options.routes
        .filter((r) => breadcrumbs?.includes(r.name))
        .map((r) => ({ title: r.meta?.name, to: r.path }))
      return [...crumbRoutes, { title: mainRoute.value.meta.name }]
    })
    provide('route', { main: mainRoute, dialog: dialogRoute })

    const error = ref(null)
    const isPageLoading = ref(false)
    onErrorCaptured((err) => (error.value = err))
    router.beforeEach(NProgress.start)
    router.afterEach(() => setTimeout(NProgress.done, 100))

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
      breadcrumbs,
      isPageLoading,
      error,
      mainRoute,
      dialogRoute,
      isDialog,
      back,
    }
  },
})
</script>
