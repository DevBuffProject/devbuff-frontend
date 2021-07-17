<template>
  <div>
    <div class="grid grid-cols-10 gap-8 container mx-auto mt-26">
      <Header class="fixed w-full top-0 left-0 z-50" />

      <Sidebar class="col-span-2 h-min sticky top-26" />
      <div class="col-span-8">
        <router-view :route="mainRoute" v-slot="{ Component, route }">
          <template v-if="Component">
            <suspense>
              <div class="h-full container" :key="route.name">
                <AtomicBreadcrumbs
                  v-if="route?.meta.breadcrumbs"
                  :items="breadcrumbs"
                />
                <h1>{{ route.meta.name }}</h1>
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

        <router-view
          v-if="isDialog"
          :route="dialogRoute"
          v-slot="{ Component: Dialog }"
        >
          <suspense v-if="Dialog">
            <AtomicDialog visible @onClose="back">
              <component :is="dialogRoute?.meta.preview || Dialog" />
            </AtomicDialog>

            <template #fallback>
              <LoadingOverlay :visible="true" />
            </template>
          </suspense>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  provide,
  computed,
  shallowRef,
  onErrorCaptured,
  watch,
} from 'vue'
import { set, useStorage, useTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import LoadingOverlay from './components/atomic/Loading/Overlay.vue'
import Header from './components/layout/Header.vue'
import Sidebar from './components/layout/Sidebar.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useGlobalState } from './composes/core/useGlobalState'

export default defineComponent({
  components: {
    Header,
    Sidebar,
    LoadingOverlay,
  },
  setup() {
    useTitle('DefBuff')

    const router = useRouter()
    // fix vue-router length undefined
    const mainRoute = shallowRef({ matched: [] })
    const dialogRoute = shallowRef(null)
    const isDialog = ref(false)
    const isPageLoading = ref(false)
    const error = ref(null)
    // TODO: useBreadcrumbs
    const breadcrumbs = computed(() => {
      const breadcrumbs = mainRoute.value?.meta.breadcrumbs || []
      const crumbRoutes = router.options.routes
        .filter((r) => breadcrumbs?.includes(r.name))
        .map((r) => ({ title: r.meta?.name, to: r.path }))
      return [...crumbRoutes, { title: mainRoute.value.meta.name }]
    })

    const back = () => router.back()

    router.beforeEach(() => {
      NProgress.start()
      set(isPageLoading, true)
    })
    router.afterEach(() =>
      setTimeout(() => {
        NProgress.done()
        set(isPageLoading, false)
      }, 100),
    )
    router.beforeResolve((to, from, next) => {
      set(isPageLoading, true)
      set(isDialog, Boolean(to.params._isDialog))
      set(dialogRoute, isDialog.value ? to : null)
      // Prevent reactive triggers if background route isn't changed
      const bgRoute = isDialog.value ? from : to
      if (mainRoute.value.fullPath !== bgRoute.fullPath) set(mainRoute, bgRoute)
      next()
    })

    onErrorCaptured((err) => set(error, err))
    provide('route', { main: mainRoute, dialog: dialogRoute })
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
