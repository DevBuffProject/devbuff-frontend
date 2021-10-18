<template>
  <div>
    <LayoutHeader class="fixed w-full top-0 left-0 z-50" />
    <div class="my-26">
      <div class="lg:(grid grid-cols-10 gap-8) container mx-auto">
        <LayoutSidebar
          class="h-min col-span-2 hidden lg:(block sticky top-26)"
        />
        <div class="col-span-8">
          <router-view :route="mainRoute" v-slot="{ Component, route }">
            <template v-if="Component">
              <suspense>
                <div class="h-full" :key="route.name">
                  <AtomicBreadcrumbs v-if="breadcrumbs" :items="breadcrumbs" />
                  <h2 v-if="route?.meta.name">{{ route.meta.name }}</h2>
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

    <LayoutBottomNav class="lg:hidden" />

    <router-view
      v-if="dialogRoute"
      :route="dialogRoute"
      v-slot="{ Component, route }"
    >
      <suspense v-if="Component">
        <AtomicDialog visible @close="back">
          <h2 v-if="route?.meta.name" class="mt-2">{{ route.meta.name }}</h2>
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
import { defineComponent, computed } from 'vue'
import { useTitle } from '@vueuse/core'
import { useDialogRoute, useMainRoute, useRouter } from './core/router'
import { useI18n } from './composes'

export default defineComponent({
  setup() {
    useTitle('DefBuff')
    const { t, tDefault } = useI18n('breadcrumbs')
    const router = useRouter()
    const mainRoute = useMainRoute()
    const dialogRoute = useDialogRoute()

    const breadcrumbs = computed(() => {
      const breadcrumbs = mainRoute.value?.meta.breadcrumbs || []
      const crumbRoutes = router.options.routes
        .filter((r) => breadcrumbs?.includes(r.name))
        .map((r) => ({ title: t(r.meta?.name), to: r.path }))
      return [
        ...crumbRoutes,
        { title: tDefault(mainRoute.value.meta.name, '') },
      ]
    })

    const back = () => router.back()

    return {
      breadcrumbs,
      mainRoute,
      dialogRoute,
      back,
    }
  },
})
</script>
