<template>
  <div class="ideas">
    <v-toolbar hide-backlink class="mb-10">
      <h3 class="m-0"> {{ $t('page.ideas.explore.ideas') }} </h3>
    </v-toolbar>
    <div class="container mx-auto">
      <div class="ideas__grid">
        <div class="ideas__grid-column-filter">
          <v-card class="ideas__filter">
            filter
          </v-card>
        </div>

        <div class="ideas__grid-column-ideas">
          <div class="ideas__sort">
            <v-label name="сортировка">
              <v-switcher
                :values="[
                  { title: $t('page.ideas.explore.filter.datePublish'), value: 'date' },
                  { title: $t('page.ideas.explore.filter.lastUpdate'), value: 'lastUpdate' }
                ]"
                :value="filter.sortBy"
                @change="applyFilter({ sortBy: $event })"
              />
            </v-label>
            <transition name="fade">
              <v-loading v-show="loading" class="ml-4 muted"/>
            </transition>
          </div>

          <v-card v-if="ideas.length" class="ideas__list">
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
          </v-card>
          <div v-else class="p-5 ideas__no-ideas">
            🤷 <span class="text-muted"> {{ $t('page.ideas.explore.notFound') }} </span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  async middleware({store, route}) {
    await store.dispatch('ideas/getIdeas', route.query)
    await store.dispatch('skills/getSkills')
  },

  data() {
    return {
      moreLoading: false,
      noMoreLoaded: false,
      loading: false,
      filter: {
        page: 1,
        sortBy: 'date',
        ...(function (val) {
          if (val.specialists !== undefined && val.specialists !== null && val.specialists.length > 0) {
            val.specialists = val.specialists.split(',');
          } else {
            val.specialists = [];
          }
          return val;
        })(this.$route.query),
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
    filteredLanguages() {
      if (!Array.isArray(this.filter.specialists)) {
        return [];
      }

      let languages = new Set();

      for (let language of this.skills) {
        for (let specialization of language.specializations) {
          if (this.filter.specialists.indexOf(specialization.name) > -1) {
            languages.add(language.name);
          }
        }
      }

      return Array.from(languages);
    }
  },

  methods: {
    async excludeFilter(filters) {
      if (Array.isArray(filters)) {
        filters.forEach(filter => this.filter[filter] = [])
      } else {
        for (let key of Object.keys(filters)) {
          let index = this.filter[key].indexOf(filters[key]);
          if (index > -1) {
            this.filter[key].splice(index, 1);
          }
        }
        //Validate languages
        if (Array.isArray(this.filter.languages)) {
          this.filter.languages.forEach((lang, index, object) => {
            if (this.filteredLanguages.indexOf(lang) === -1) {
              object.splice(index, 1);
            }
          });
        }

      }
      return await this.updateIdeas();
    },
    async applyFilter(filter = {}) {
      for (let key of Object.keys(filter)) {
        if (this.filter[key] === undefined) {
          this.filter[key] = [];
        }

        if (Array.isArray(this.filter[key])) {
          this.filter[key].push(filter[key]);
        } else {
          this.filter[key] = filter[key];
        }
      }

      return await this.updateIdeas();
    },
    async updateIdeas() {
      const params = JSON.parse(JSON.stringify(this.filter));

      if (params.specialists.length > 0) {
        params.specialists = params.specialists.join(',')
      } else {
        delete params.specialists;
      }

      if (Array.isArray(params.languages) && params.languages.length > 0) {
        params.languages = params.languages.join(',')
      } else {
        delete params.languages;
      }

      await this.loadIdeas()
      this.$router.replace({
        ...this.$route,
        query: params
      }).catch(()=>{});
    },
    async loadMore() {
      try {
        this.filter.page++
        this.moreLoading = true

        const ideas = await this.loadIdeas()

        this.moreLoading = false

        if (ideas.length === 0) {
          this.filter.page--
          this.noMoreLoaded = true
        }
      } catch (e) {
        this.noMoreLoaded = true
        this.moreLoading = false
      }
    },
    async loadIdeas() {
      try {
        this.loading = true
        this.$nuxt.$loading.start()

        const ideas = await this.$store.dispatch('ideas/getIdeas', this.filter)

        this.loading = false
        this.$nuxt.$loading.finish()

        return ideas
      } catch (e) {
        this.loading = false
        this.$nuxt.$loading.finish()
      }
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
        {hid: 'description', name: 'description', content: 'Список проектов'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@layer components {
  .ideas {
    &__grid {
      @apply grid gap-4 grid-cols-8;
    }

    &__grid-column-filter {
      @apply col-span-2;
    }

    &__grid-column-ideas {
      @apply col-span-6;
    }

    &__filter {
      @apply w-auto sticky top-20 rounded-md col-span-2;
    }

    &__sort {
      @apply mb-4;
    }

    &__list {
      @apply p-0 #{!important};
    }

    &__idea {
      @apply border-b border-muted cursor-pointer border-b-0;
    }

    &__no-ideas {
      @apply text-2xl font-light text-muted;
    }
  }
}
</style>
