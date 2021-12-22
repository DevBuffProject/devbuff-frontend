<template>
  <UseOnline v-slot="{ isOnline }">
    <transition name="fade">
      <teleport v-if="!isOnline" to="body">
        <div
          class="bg-red-500 text-white font-semibold transition-all transform -translate-x-1/2 flex justify-center items-center absolute top-2 left-1/2 px-10 py-2 shadow-xl rounded-full z-50 text-xs tracking-widest uppercase"
        >
          <AtomicLoadingSpinner />
          <span class="mt-px ml-4">связь с интернетом пропала</span>
        </div>
      </teleport>
    </transition>
  </UseOnline>

  <LayoutHeader class="sticky top-0 z-50" />

  <div class="py-6">
    <div class="lg:(grid grid-cols-10 gap-8) container mx-auto">
      <LayoutSidebar
        class="h-min col-span-2 hidden lg:block sticky top-23 z-50"
      />

      <div class="col-span-8">
        <router-view :route="mainRoute" v-slot="{ Component, route }">
          <template v-if="Component">
            <suspense>
              <div :key="route.fullPath">
                <h1 class="text-h1 mt-0" v-if="route?.meta.name">
                  {{ route.meta.name }}
                </h1>
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
      <AtomicDialog visible @close="back" max-width="900px">
        <AtomicCard>
          <h2 v-if="route?.meta.name" class="mt-2">{{ route.meta.name }}</h2>
          <suspense>
            <component :is="route?.meta.preview || Component" />

            <template #fallback>loading</template>
          </suspense>
        </AtomicCard>
      </AtomicDialog>

      <template #fallback>
        <AtomicLoadingOverlay @close="back" />
      </template>
    </suspense>
  </router-view>

  <AtomicLoadingOverlay :visible="isDialogRouteLoading" @close="back" />
</template>

<script setup>
import { computed, onErrorCaptured, ref } from 'vue'
import { useTitle } from '@vueuse/core'
import { useRouter } from './core/router'
import { useI18n } from './composes'

const error = ref(false)
// onErrorCaptured((err, instance) => {
//   error.value = err
//   return false
// })
useTitle('DefBuff')
const { t, tDefault } = useI18n('breadcrumbs')
const { mainRoute, dialogRoute, isDialogRouteLoading, ...router } = useRouter()
const back = router.backToMainRoute
</script>
