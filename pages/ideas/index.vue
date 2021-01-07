<template>
  <div class="explore">
    <v-toolbar class="mb-4">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> {{ $t('page.ideas.explore.ideas') }} </h3>
        </div>
      </div>
    </v-toolbar>
    {{ filter }}<br>
    {{ filteredLanguages }}
    <div class="container">
      <div class="explore__filter mb-3">
        <div class="mb-4">
          <div class="d-flex">
            <v-label :name="$t('page.ideas.explore.filter.specializations') + ' — '+ specs.length" class="mr-4">
              <span
                :class="[
                  'mr-2',
                  'explore__filter-label',
                  (!filter.specialists || filter.specialists.length === 0) && 'explore__filter-label--active',
                ]"
                @click="excludeFilter(['specialists','languages'])"
              >
                <v-chip
                  :text="$t('page.ideas.explore.filter.all')"
                  :type="!filter.specialists || filter.specialists.length === 0 ? 'auto' : null"
                />
              </span>

              <span
                v-for="spec in specs"
                :key="spec"
                :class="[
                  'mr-2',
                  'explore__filter-label',
                  (filter.specialists && filter.specialists.indexOf(spec) > -1) && 'explore__filter-label--active',
                ]"
                @click="(filter.specialists && filter.specialists.indexOf(spec) > -1) ? excludeFilter({ specialists: spec }): applyFilter({ specialists: spec })"
              >
                <v-chip
                  :text="t('specializations.'+spec+'.title',spec)"
                  :type="filter.specialists && filter.specialists.indexOf(spec) > -1
                    ? 'auto'
                    : null
                  "
                />
              </span>
            </v-label>

            <v-label v-if="filteredLanguages.length>0" :name="$t('page.ideas.explore.filter.languages')">
              <span
                v-for="lang in filteredLanguages"
                :key="lang"
                :class="[
                  'mr-2',
                  'explore__filter-label',
                  (filter.languages && filter.languages.indexOf(lang) > -1) && 'explore__filter-label--active',
                ]"
                @click="(filter.languages && filter.languages.indexOf(lang) > -1) ? excludeFilter({ languages: lang }): applyFilter({ languages: lang })"
              >
                 <v-chip
                   :text="t('languages.'+lang,lang)"
                   :type="filter.languages && filter.languages.indexOf(lang) > -1
                    ? 'auto'
                    : null
                  "
                 />
              </span>
            </v-label>
          </div>
        </div>

        <div class="explore__filter-sort d-flex align-items-center">
          <v-switcher
            :values="[
              { title: $t('page.ideas.explore.filter.datePublish'), value: 'date' },
              { title: $t('page.ideas.explore.filter.lastUpdate'), value: 'lastUpdate' }
            ]"
            :value="filter.sortBy"
            @change="applyFilter({ sortBy: $event })"
          />
          <transition name="fade">
            <v-loading v-show="loading" class="ml-4 muted"/>
          </transition>
        </div>
      </div>

      <transition name="fade">
        <div v-if="ideas.length" class="explore__ideas">
          <v-idea-card
            v-for="idea in ideas"
            :key="idea.id"
            :title="idea.name"
            :publishDate="idea.publishDate || idea.datePublished"
            :description="idea.description"
            :specialists="idea.specialists"
            :id="idea.id"
            class="explore__idea"
          />
        </div>
        <div v-else class="p-5 explore__no-ideas">
          🤷 <span class="muted-text"> {{ $t('page.ideas.explore.notFound') }} </span>
        </div>
      </transition>

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
.explore {
  &__filter {
    width: 100%;
    max-width: 600px;
  }

  &__filter-label {
    opacity: .6;
    cursor: pointer;
    transition: opacity .3s var(--base-transition);
  }

  &__filter-label:hover,
  &__filter-label--active {
    opacity: 1
  }

  &__ideas {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-gap: 1rem;
  }

  &__idea {
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
  }

  &__no-ideas {
    font-size: 1.5rem;
    font-weight: 100;
  }
}
</style>
