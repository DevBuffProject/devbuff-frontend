<template>
  <main>
    <div class="grid grid-cols-14 gap-6">
      <div class="col-span-10" id="ideas">
        <div ref="ideasRef" v-if="ideas.length > 0" class="">
          <WidgetIdeasCard
            v-for="idea of ideas"
            :key="idea.id"
            :idea="idea"
            class="mb-6 w-[calc(50%-10px)]"
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
import { ref, computed, defineComponent, reactive, inject, watch } from 'vue'
import { templateRef, useThrottleFn, useTitle } from '@vueuse/core'
import { useIdeas, useAuth } from '../composes/core'
import { useI18n } from '../composes/utils'
import { useRouter } from 'vue-router'
import { useRouteQuery } from '@vueuse/router'
import { useMasonry } from '../composes/dom'

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

    const sort = filterQueryReactive('sort', true)
    const specialists = filterQueryReactive('specialists')
    const languages = filterQueryReactive('languages')
    const filter = reactive({ specialists, languages, sort })

    const throttledGetIdeas = useThrottleFn(
      async () => await getIdeas(filter),
      500,
    )

    useMasonry(templateRef('ideasRef'), { gutter: 10 })

    watch(filter, throttledGetIdeas)
    await getIdeas(filter)

    return {
      t,
      ideas,
      filter,
      isLoading,
      isLoggedIn,
      files: ref([]),
    }
  },
})
</script>
