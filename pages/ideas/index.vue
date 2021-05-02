<template>
  <div>
    <atomic-breadcrumbs :items="breadcrumbs" />
    <div class="grid grid-cols-4 gap-6">
      <div class="col-span-3">
        <h1>{{ $t('page.ideas.explore.header') }}</h1>
        <div class="mb-4 flex items-center justify-between">
          <atomic-switcher
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
          <div>
            <atomic-loading-spinner v-show="loading" />
          </div>
        </div>

        <masonry :cols="2" :gutter="30">
          <div v-for="idea in ideas" :key="idea.id">
            <div>
              <widget-idea
                :id="idea.id"
                :title="idea.name"
                :date="idea.publishDate || idea.datePublished"
                :description="idea.description"
                :specialists="idea.specialists"
                class="mb-6"
              >
                <template #user>
                  <div class="flex items-center mt-3">
                    <atomic-avatar class="mr-3" size="24px" />
                    <div class="mt-px">User Name</div>
                  </div>
                </template>
              </widget-idea>
            </div>
          </div>
        </masonry>
      </div>
      <div class="col-span-1">
        <widget-filter
          v-model="filter.params"
          :fields="filterOptions"
          class="sticky top-4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import qs from '~/app/utils/url'

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
      // grid: {
      //   inlineView: true,
      //   key: 0,
      // },
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
      title: 'Devbuff - Проекты',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Список открытых проектов',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      ideas: 'ideas/list',
      langs: 'skills/languages',
      skills: 'skills/skills',
      specs: 'skills/specializations',
    }),
    breadcrumbs() {
      return [
        {
          title: this.$t('components.breadcrumb.main'),
          to: this.localePath({ name: 'index' }),
        },
        {
          title: this.$t('components.breadcrumb.idea'),
          to: this.localePath({ name: 'ideas' }),
        },
      ]
    },
    filterOptions() {
      const result = []

      result.push({
        name: this.t('common.specializations'),
        value: 'specialists',
        params: this.specs.map((currentValue) => ({
          value: currentValue,
          name: this.t(
            'specializations.' + currentValue + '.title',
            currentValue
          ),
        })),
      })

      const currentSpecialists = this.filter.params.specialists

      if (
        !Array.isArray(currentSpecialists) ||
        currentSpecialists.length === 0
      ) {
        return result
      }

      const languages = new Set()

      for (const language of this.skills) {
        for (const specialization of language.specializations) {
          if (currentSpecialists.includes(specialization.name)) {
            languages.add(language.name)
          }
        }
      }

      result.push({
        name: this.t('components.ideaCard.languages'),
        value: 'languages',
        params: Array.from(languages).map((currentValue) => ({
          value: currentValue,
          name: this.t('languages.' + currentValue, currentValue),
        })),
      })

      return result
    },
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.applyFilter()
      },
    },
  },
  methods: {
    // toggleInlineView: throttle(function () {
    //   this.grid.inlineView = !this.grid.inlineView
    //   setTimeout(() => this.grid.key++, 1000)
    // }, 1000),
    async applyFilter() {
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
      await this.$store.dispatch('ideas/getIdeas', filter)
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
