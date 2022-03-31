<template>
  <main>
    <div class="lg:grid lg:grid-cols-14 lg:gap-6">
      <AtomicAlert
        v-if="missingAuthorization"
        style="cursor: pointer"
        type="danger"
        class="col-span-10"
      >
        <div v-if="!isLoggedIn">
          {{ t('missingAuthorization.notAuthorization') }}
        </div>
        <div v-else>
          {{ t('missingAuthorization.notHavePermission') }}
        </div>
      </AtomicAlert>
      <div class="col-span-10" id="ideas">
        <WidgetIdeasCard
          v-for="idea of ideas.ideas"
          :key="idea.id"
          :idea="idea"
          class="mb-4"
        />
        <AtomicPagination
          v-model="filter.page"
          :per-page="ideas.perPage"
          :elements="ideas.ideas.length"
          class="mb-10"
        ></AtomicPagination>
      </div>

      <WidgetIdeasFilter
        v-model="filter"
        class="hidden lg:block lg:col-span-4 sticky top-26 h-min"
      />
    </div>
  </main>
</template>

<script>
import { computed, defineComponent, reactive, watch, ref } from 'vue'
import { useThrottleFn, useTitle } from '@vueuse/core'
import { useIdeas, useAuth } from '../composes'
import { useI18n } from '../composes'
import { useRouter } from 'vue-router'
import { useMainRoute } from '../core/router'

export default defineComponent({
  async setup() {
    useTitle('Explore ideas - Devbuff')

    const router = useRouter()
    const filterQueryReactive = (name, defaultValue) =>
      computed({
        get: () =>
          defaultValue
            ? route.value.query?.[name] ?? defaultValue
            : [route.value.query?.[name] ?? null].flat().filter(Boolean),
        set: (value) =>
          router.push({ query: { ...route.value.query, [name]: value } }),
      })

    const route = useMainRoute()
    const { isLoading, ideas, getIdeas } = useIdeas()
    const { t } = useI18n('pages.explore')
    const { isLoggedIn } = useAuth()
    const missingAuthorization = ref(
      Boolean(route.value.query?.missingAuthorization),
    )

    const page = filterQueryReactive('page', 1)
    const sortBy = filterQueryReactive('sortBy', 'lastUpdate')
    const specialists = filterQueryReactive('specialists')
    const languages = filterQueryReactive('languages')
    const filter = reactive({ page, specialists, languages, sortBy })
    const throttledGetIdeas = useThrottleFn(
      async () => await getIdeas(filter),
      500,
    )

    // TODO: reactify function
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
