<template>
  <div class="grid grid-cols-6 gap-6">
    <div class="col-span-4" id="ideas">
      <div v-if="!isLoading && ideas.length > 0" class="grid grid-cols-2 gap-4">
        <WidgetIdeasCard
          v-for="(idea, index) of ideas"
          :key="idea.id"
          :id="idea.id"
          :idea="idea"
          v-motion
          :initial="{ opacity: 0, y: -20, scale: 0.95 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="100 * index"
          class="mb-6"
        />
      </div>

      <div v-else-if="isLoading" class="mt-20 flex items-center justify-center">
        <AtomicLoadingLogo />
      </div>

      <span v-else class="text-2xl">{{ t('notFound') }}</span>
    </div>

    <div class="col-span-2">
      <AtomicSwitcher
        class="mb-4"
        v-model:value="filter.sort"
        :values="[
          {
            title: t('filter.date'),
            value: 'date',
          },
          {
            title: t('filter.lastUpdate'),
            value: 'lastUpdate',
          },
        ]"
      />
      <WidgetIdeasFilter v-model="filter" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, inject, watch } from 'vue'
import {
  debouncedWatch,
  useDebounceFn,
  useThrottleFn,
  useTitle,
} from '@vueuse/core'
import { useIdeas, useUser, useAuth } from '../composes/core'
import { useI18n } from '../composes/utils'
import { useRouter } from 'vue-router'

export default defineComponent({
  async setup() {
    useTitle('Explore ideas - Devbuff')

    const filterQueryReactive = (name) =>
      computed({
        get: () => [route.value.query?.[name] ?? null].flat().filter(Boolean),
        set: (value) =>
          router.push({ query: { ...route.value.query, [name]: value } }),
      })

    const router = useRouter()
    const { main: route } = inject('route')
    const { isLoading, ideas, getIdeas } = useIdeas()
    const { t } = useI18n('pages.explore')
    const { isLoggedIn } = useAuth()
    const specialists = filterQueryReactive('specialists')
    const languages = filterQueryReactive('languages')
    const filter = reactive({ specialists, languages })
    const throttledGetIdeas = useThrottleFn(
      async () => await getIdeas(filter),
      500,
    )
    throttledGetIdeas()

    watch(filter, throttledGetIdeas)

    return { t, ideas, filter, isLoading, isLoggedIn }
  },
})
</script>
