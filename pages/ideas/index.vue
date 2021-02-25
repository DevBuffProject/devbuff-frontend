<template>
  <div class="ideas">
    <v-toolbar hide-backlink class="mb-10">
      <h3 class="m-0"> {{ $t('page.ideas.explore.ideas') }} </h3>
    </v-toolbar>
    <div class="container mx-auto">
      <div class="ideas__grid">
        <div class="ideas__grid-column-filter">
          <v-filter :fields="filterOptions" v-model="filter.params"/>
        </div>

        <div class="ideas__grid-column-ideas">
          <div class="ideas__sort">
            <v-switcher
              :values="[
              { title: $t('page.ideas.explore.filter.datePublish'), value: 'date' },
              { title: $t('page.ideas.explore.filter.lastUpdate'), value: 'lastUpdate' }
            ]"
              v-model="filter.sort"
            />

            <transition name="fade">
              <v-loading v-show="loading" class="ml-4 opacity-50"/>
            </transition>
          </div>

          <div v-if="ideas.length" class="ideas__list grid grid-cols-3 gap-4">
            <v-idea
              v-for="idea in ideas"
              :key="idea.id"
              :title="idea.name"
              :publishDate="idea.publishDate || idea.datePublished"
              :description="idea.description"
              :specialists="idea.specialists"
              :id="idea.id"
              class="ideas__idea"
            />
          </div>
          <div v-else class="p-5 ideas__no-ideas">
            🤷 <span class="text-muted"> {{ $t('page.ideas.explore.notFound') }} </span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { qs } from '~/assets/js/url'

export default {
  async middleware({store, route}) {
    await store.dispatch('ideas/getIdeas', route.query)
    await store.dispatch('skills/getSkills')
  },

  data() {
    const query = Object.entries(qs.parse(this.$route.fullPath.split('?')[1]))
      .reduce((acc, [key, params]) => {
        acc[key] = !Array.isArray(params) ? [params] : params
        return acc
      }, {})

    return {
      moreLoading: false,
      noMoreLoaded: false,
      loading: false,
      filter: {
        page: 1,
        sort: 'date',
        params: query
      }
    }
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.applyFilter()
      }
    }
  },
  computed: {
    ...mapGetters({
      ideas: 'ideas/list',
      langs: 'skills/languages',
      skills: 'skills/skills',
      specs: 'skills/specializations'
    }),
    filterOptions() {
      return [
        {
          name: this.t('common.specializations'),
          value: 'specialists',
          params: this.specs.map(value => {
            return {
              value: value,
              name: this.t('specializations.' + value + '.title', value)
            }
          })
        },
        {
          name: this.t('components.ideaCard.languages'),
          value: 'languages',
          params: this.langs.map(value => {
            return {
              value: value,
              name: this.t('languages.' + value, value)
            }
          })
        }
      ]
    },
  },

  methods: {
    applyFilter() {
      const filter = {
        sortBy: this.filter.sort,
        page: this.filter.page,
        ...this.filter.params
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
        : fallbackStr
          ? fallbackStr
          : str
    },
  },

  head() {
    return {
      title: 'Devbuff :: Проекты',
      meta: [
        { hid: 'description', name: 'description', content: 'Список проектов' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@layer components {
  .ideas {
    &__grid {
      @apply grid gap-6 grid-cols-10;
    }

    &__grid-column-filter {
      @apply col-span-2;
    }

    &__grid-column-ideas {
      @apply col-span-8;
    }

    &__filter {
      @apply w-auto sticky top-20 col-span-2;
      @apply rounded-xl #{!important};
    }

    &__sort {
      @apply mb-4 flex items-center;
    }

    &__list {
      @apply p-0 border-0 #{!important};
    }

    &__no-ideas {
      @apply text-2xl font-light text-muted;
    }
  }
}
</style>
