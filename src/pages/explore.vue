<template>
  <div class="grid grid-cols-4 gap-6">
    <div class="col-span-3" id="ideas">
      <div v-for="(idea, index) of ideas" :key="idea.id" class="pr-6 mb-6">
        <WidgetIdeasCard
          :id="idea.id"
          :title="idea.name"
          :date="idea.publishDate || idea.datePublished"
          :description="idea.description"
          :specialists="idea.specialists"
          v-motion
          :initial="{ opacity: 0, y: -20, scale: 0.95 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="100 * index"
        >
          <template #user>
            <div class="flex items-center mt-3">
              <AtomicAvatar
                class="mr-3"
                size="24px"
                :avatar="getUserProfileUrl(idea.ownerIdea.id)"
              />
              <div class="mt-px">
                {{ idea.ownerIdea.firstName }} {{ idea.ownerIdea.lastName }}
              </div>
            </div>
          </template>
        </WidgetIdeasCard>
      </div>
      <div v-show="!ideas.length" class="flex justify-center">
        <div
          :class="[
            'w-[200px] h-[130px]',
            'flex flex-col items-center justify-center',
            'bg-gray-100 dark:bg-blueGray-800 p-8 rounded-md',
          ]"
        >
          <template v-if="!isLoading">
            <span class="text-4xl mb-4">🤷</span>
            <span class="text-2xl opacity-30">no ideas</span>
          </template>
          <AtomicLoadingSpinner v-else />
        </div>
      </div>
    </div>

    <WidgetIdeasFilter v-model="filter" class="col-span-1" />
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
import { useIdeas, useUser } from '../composes/core'
import { useRouter } from 'vue-router'

export default defineComponent({
  async setup() {
    useTitle('Explore ideas - Devbuff')

    const filterQueryReactive = (name) => {
      return computed({
        get: () => {
          const data = route.value.query?.[name] ?? null
          return [data].flat().filter(Boolean)
        },
        set: (value) => {
          router.push({ query: { ...route.value.query, [name]: value } })
        },
      })
    }
    const router = useRouter()
    const route = inject('backgroundRoute')
    const { ideas, isLoading, getIdeas } = useIdeas()
    const specialists = filterQueryReactive('specialists')
    const languages = filterQueryReactive('languages')
    const filter = reactive({ specialists, languages })
    const throttledGetIdeas = useThrottleFn(
      async () => await getIdeas(filter),
      500,
    )

    const { getUserProfileUrl } = useUser()
    throttledGetIdeas()
    watch(filter, throttledGetIdeas)

    return { ideas, filter, isLoading, route, getUserProfileUrl }
  },
})
</script>
