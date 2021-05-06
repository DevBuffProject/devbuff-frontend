<template>
  <div>
    <div class="flex items-start justify-between mb-10 w-full">
      <div class="w-[400px]">
        <atomic-form-input
          v-model="state.name"
          label="Idea name"
          name="Idea name"
          class="mb-2 w-full"
          placeholder="Idea name"
          rules="required"
        />
        <atomic-form-input
          v-model="state.description"
          label="Idea description"
          name="Idea description"
          type="textarea"
          class="w-full"
          placeholder="Idea desc"
          rules="required"
        />
      </div>
      <div class="mr-10 mt-8 flex flex-col">
        <atomic-avatar
          avatar="//source.unsplash.com/random"
          class="mb-2"
          size="130px"
        />
        <div class="transform scale-[0.8] flex justify-center">
          <atomic-button type="muted"> Select </atomic-button>
        </div>
      </div>
    </div>
    <client-only>
      <lazy-widget-editor v-model="state.text" />
    </client-only>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  useFetch,
  ref,
} from '@nuxtjs/composition-api'
import { useLocale } from '~/composes'

export default defineComponent({
  setup() {
    const { query, store } = useContext()
    const { localePath, i18n } = useLocale()
    const { id } = query.value
    const breadcrumbs = [
      {
        title: i18n.t(`components.header.dashboard`),
        to: localePath({ name: 'index' }),
      },
      {
        title: i18n.t`components.breadcrumb.idea`,
        to: localePath({ name: 'ideas' }),
      },
    ]
    const state = ref({
      name: '',
      description: '',
      text: '',
      specialists: [],
    })
    const { fetchState } = useFetch(async () => {
      if (id) {
        const idea = await store.dispatch('ideas/getIdea', id)
        state.value = JSON.parse(JSON.stringify(idea))
      }
    })

    return { breadcrumbs, state, fetchState }
  },
})
</script>
