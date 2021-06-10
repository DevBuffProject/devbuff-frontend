<template>
  <div class="grid grid-cols-4 gap-6">
    <div class="col-span-3" id="ideas">
      <template v-if="!isLoading && ideas">
        <WidgetIdeasCard
          v-for="(idea, index) of ideas"
          :key="idea.id"
          :linked="isLoggedIn"
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
            <div class="flex items-center mt-3 mb-6">
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
      </template>
      <div v-else-if="isLoading" class="mt-20 flex items-center justify-center">
        <AtomicLoadingLogo />
      </div>
      <template v-else>
        <span class="text-4xl mb-4">🤷</span>
        <span class="text-2xl opacity-30">no ideas</span>
      </template>
    </div>

    <div class="col-span-1">
      <AtomicSwitcher
        class="mb-4"
        v-model:value="filter.sort"
        :values="[
          {
            title: 'Date',
            value: 'date',
          },
          {
            title: 'Last update',
            value: 'lastUpdate',
          },
        ]"
      >
      </AtomicSwitcher>
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
    const route = inject('backgroundRoute')
    const { isLoading, ideas, getIdeas } = useIdeas()
    const { getUserProfileUrl } = useUser()
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

    return { ideas, filter, isLoading, getUserProfileUrl, isLoggedIn }
  },
})
</script>
