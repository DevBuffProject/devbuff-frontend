<template>
  <div class="explore">
    <v-toolbar class="mb-4">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> {{ $t('page.ideas.explore.ideas') }} </h3>
        </div>
        <div>
          <nuxt-link :to="localePath({ name: 's-ideas-editor' })">
            <v-button :icon="['fas', 'plus']">
              {{ $t('page.ideas.explore.new') }}
            </v-button>
          </nuxt-link>
        </div>
      </div>
    </v-toolbar>

    <div class="container">
      <div class="explore__filter mb-3">
        <div class="mb-4">
          <div class="d-flex">
            <v-label name="специальности" class="mr-4">
              <span
                :class="[
                  'mr-2',
                  'explore__filter-label',
                  !filter.specialists && 'explore__filter-label--active',
                ]"
                @click="applyFilter({ specialists: '' })"
              >
                <v-chip
                  text="все"
                  :type="!filter.specialists ? 'auto' : null"
                />
              </span>

              <span
                v-for="spec in specs"
                :key="spec"
                :class="[
                  'mr-2',
                  'explore__filter-label',
                  (filter.specialists && filter.specialists === spec) && 'explore__filter-label--active',
                ]"
                @click="applyFilter({ specialists: spec })"
              >
                <v-chip
                  :text="spec"
                  :type="filter.specialists && filter.specialists === spec
                    ? 'auto'
                    : null
                  "
                />
              </span>
            </v-label>

            <v-label name="языки программирования">
              <span
                v-for="lang in langs"
                :key="lang"
                class="mr-2"
              >
                <v-chip :text="lang" />
              </span>
            </v-label>
          </div>
        </div>

        <div class="explore__filter-sort d-flex align-items-center">
          <v-switcher
            :values="[
              { title: 'по дате публикации', value: 'date' },
              { title: 'по дате обновления', value: 'lastUpdate' }
            ]"
            :value="filter.sortBy"
            @change="applyFilter({ sortBy: $event })"
          />
          <transition name="fade">
            <v-loading v-show="loading" class="ml-4 muted" />
          </transition>
        </div>
      </div>

      <div v-if="ideas" class="explore__ideas">
        <nuxt-link
          v-for="idea in ideas"
          tag="div"
          :key="idea.id"
          :to="localePath({ name: 's-ideas-id', params: { id: idea.id } })"
        >
          <v-idea-card
            :title="idea.name"
            :publishDate="idea.publishDate || idea.datePublished"
            :description="idea.description"
            :specialists="idea.specialists"
            :id="idea.id"
            class="explore__idea"
          />
        </nuxt-link>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store, route }) {
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
        ...this.$route.query,
      }
    }
  },

  computed: {
    ...mapGetters({
      ideas: 'ideas/list',
      langs: 'skills/languages',
      specs: 'skills/specializations'
    })
  },

  methods: {
    async applyFilter(filter = {}) {
      const newFilter = this.filter = {
        ...this.filter,
        ...filter,
      }

      await this.loadIdeas()

      this.$router.replace({
        ...this.$route,
        query: {
          ...this.$route.query,
          ...newFilter
        }
      })
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
    }
  },
}
</script>

<style lang="scss" scoped>
.explore {
  &__filter {
    width: 100%;
    max-width: 600px;
  }

  &__filter-label {
    opacity: .5;
    cursor: pointer;
    transition: opacity .3s var(--base-transition);
  }
  &__filter-label:hover,
  &__filter-label--active {
    opacity: 1
  }

  &__ideas {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: .5rem;
  }

  &__idea {
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
  }

  &__more {
    color: var(--color-primary);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
