<template>
  <div>
    <div class="mb-4 flex items-center">
      <v-switcher
        v-model="filter.sort"
        :values="[
          {
            title: $t('page.ideas.explore.filter.datePublish'),
            value: 'date',
          },
          {
            title: $t('page.ideas.explore.filter.lastUpdate'),
            value: 'lastUpdate',
          },
        ]"
      />
    </div>

    <div class="grid grid-cols-4 gap-6">
      <div class="col-span-3">
        <div v-if="ideas.length" class="grid grid-cols-3 gap-4">
          <v-idea
            v-for="(idea, index) in ideas"
            :id="idea.id"
            :key="index"
            :title="idea.name"
            :publish-date="idea.publishDate || idea.datePublished"
            :description="idea.description"
            :specialists="idea.specialists"
            class="ideas__idea"
          />
        </div>
        <div v-else class="p-5">
          🤷
          <span class="text-muted">
            {{ $t('page.ideas.explore.notFound') }}
          </span>
        </div>
      </div>
      <div class="col-span-1">
        <v-filter v-model="filter.params" :fields="filterOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { qs } from '~/assets/js/url'

export default {
  async middleware({ store, route }) {
    await store.dispatch('ideas/getIdeas', route.query)
    await store.dispatch('skills/getSkills')
  },
  data() {
    const query = Object.entries(
      qs.parse(this.$route.fullPath.split('?')[1])
    ).reduce((acc, [key, params]) => {
      acc[key] = !Array.isArray(params) ? [params] : params
      return acc
    }, {})

    return {
      loading: false,
      filter: {
        page: 1,
        sort: 'date',
        params: query,
      },
    }
  },
  head() {
    return {
      title: 'Devbuff :: Проекты',
      meta: [
        { hid: 'description', name: 'description', content: 'Список проектов' },
      ],
    }
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.applyFilter()
      },
    },
  },
  computed: {
    ...mapGetters({
      ideas: 'ideas/list',
      langs: 'skills/languages',
      skills: 'skills/skills',
      specs: 'skills/specializations',
    }),
    filterOptions() {
      return [
        {
          name: this.t('common.specializations'),
          value: 'specialists',
          params: this.specs,
        },
        {
          name: this.t('components.ideaCard.languages'),
          value: 'languages',
          params: this.langs,
        },
      ]
    },
  },

  methods: {
    applyFilter() {
      const filter = {
        sortBy: this.filter.sort,
        page: this.filter.page,
        ...this.filter.params,
      }
      const query = qs.stringify(filter)
      history.replaceState(
        null,
        null,
        `${window.location.origin + window.location.pathname}?${query}`
      )
      this.$store.dispatch('ideas/getIdeas', filter)
    },
    t(str, fallbackStr) {
      return this.$t && this.$te
        ? this.$te(str)
          ? this.$t(str)
          : fallbackStr
        : fallbackStr || str
    },
  },
}
</script>
