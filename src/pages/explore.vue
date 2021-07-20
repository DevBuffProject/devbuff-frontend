<template>
  <main>
    <div class="grid grid-cols-14 gap-2">
      <AtomicAlert
        v-if="missingAuthorization"
        style="cursor: pointer"
        type="danger"
        class="col-span-10"
      >
        {{ t('missingAuthorization') }}
      </AtomicAlert>
      <div class="col-span-10" id="ideas">
        <div v-if="ideas.length > 0">
          <WidgetIdeasCard
            v-for="(idea, index) of ideas"
            :key="idea.id"
            :idea="idea"
            v-motion
            :initial="{ scale: 0.95, opacity: 0 }"
            :enter="{ scale: 1, opacity: 1 }"
            :delay="50 * index"
            class="mb-6"
          />
        </div>
        <AtomicLoadingOverlay :visible="isLoading" />
      </div>

      <WidgetIdeasFilter
        v-model="filter"
        class="col-span-4 sticky top-26 h-min"
      />
    </div>
  </main>
</template>

<script>
import { computed, defineComponent, reactive, inject, watch, ref } from 'vue'
import { useThrottleFn, useTitle, whenever } from '@vueuse/core'
import { useIdeas, useAuth } from '../composes/core'
import { useI18n } from '../composes/utils'
import { useRouter } from 'vue-router'

export default defineComponent({
  async setup() {
    useTitle('Explore ideas - Devbuff')

    const filterQueryReactive = (name, plain) =>
      computed({
        get: () =>
          plain
            ? route.value.query?.[name] ?? null
            : [route.value.query?.[name] ?? null].flat().filter(Boolean),
        set: (value) =>
          router.push({ query: { ...route.value.query, [name]: value } }),
      })

    const { main: route } = inject('route')
    const { isLoading, ideas, getIdeas } = useIdeas()
    const { t } = useI18n('pages.explore')
    const { isLoggedIn } = useAuth()
    const router = useRouter()

    const missingAuthorization = ref(
      Boolean(route.value.query?.missingAuthorization),
    )

    watch(
      () => route.value.query,
      (state) => {
        if (
          missingAuthorization.value === false &&
          state?.missingAuthorization
        ) {
          missingAuthorization.value = true
        }
      },
      { deep: true },
    )

    const sort = filterQueryReactive('sort', true)
    const specialists = filterQueryReactive('specialists')
    const languages = filterQueryReactive('languages')
    const filter = reactive({ specialists, languages, sort })
    const throttledGetIdeas = useThrottleFn(
      async () => await getIdeas(filter),
      500,
    )
    watch(filter, throttledGetIdeas)

    await getIdeas(filter)

    return {
      t,
      ideas,
      filter,
      isLoading,
      isLoggedIn,
      missingAuthorization,
    }
  },
})
</script>
