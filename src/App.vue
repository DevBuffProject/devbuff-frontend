<template>
  <div class="h-screen flex flex-col">
    <Header />
    <div class="grid grid-cols-10 gap-8 container mx-auto mt-8">
      <Sidebar class="col-span-2" />
      <div class="col-span-8">
        <router-view :route="mainRoute" v-slot="{ Component, route }">
          <template v-if="Component">
            <suspense>
              <div class="h-full container">
                <AtomicBreadcrumbs
                  v-if="route.meta.breadcrumbs"
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
          <template v-if="Dialog">
            <suspense>
              <AtomicDialog :visible="true" @onClose="back">
                <component :is="dialogRoute?.meta?.preview || Dialog" />
              </AtomicDialog>
              <template #fallback>
                <AtomicLoadingOverlay :visible="true" />
              </template>
            </suspense>
          </template>
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
  defineAsyncComponent,
} from 'vue'
import { set, useTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    Header: defineAsyncComponent(() =>
      import('./components/layout/Header.vue'),
    ),
    Sidebar: defineAsyncComponent(() =>
      import('./components/layout/Sidebar.vue'),
    ),
  },
  setup() {
    useTitle('DefBuff')

    const router = useRouter()
    // fix vue-router length undefined
    const mainRoute = shallowRef({ matched: [] }) // TODO: rename
    const dialogRoute = shallowRef(null)
    const isDialog = ref(false)
    const error = ref(null)
    const breadcrumbs = computed(() => {
      const breadcrumbs = mainRoute.value?.meta.breadcrumbs || []
      const crumbRoutes = router.options.routes
        .filter((r) => breadcrumbs?.includes(r.name))
        .map((r) => ({ title: r.meta?.name, to: r.path }))
      return [...crumbRoutes, { title: mainRoute.value.meta.name }]
    })

    const back = () => router.back()

    router.beforeResolve((to, from, next) => {
      set(isDialog, Boolean(to.params._isDialog))
      set(dialogRoute, isDialog.value ? to : null)
      // Prevent reactive triggers if background route isn't changed
      const bgRoute = isDialog.value ? from : to
      if (mainRoute.value.fullPath !== bgRoute.fullPath) set(mainRoute, bgRoute)
      next()
    })

    onErrorCaptured((err) => set(error, err))
    provide('route', { main: mainRoute, dialog: dialogRoute })

    const LayoutHeader = ref(null)

    return {
      isDialog,
      mainRoute,
      dialogRoute,
      breadcrumbs,
      LayoutHeader,
      error,
      back,
    }
  },
})
</script>
