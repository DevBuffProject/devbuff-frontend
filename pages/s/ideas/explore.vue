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
        <div class="explore__filter-actions">
          <v-button
            type="flat-primary"
            :icon="['fas', 'sliders-h']"
          >
            {{ $t('page.ideas.explore.advancedSearch') }}
          </v-button>
        </div>
      </div>

      <div style="width: 500px;">
        <div v-if="ideas" class="explore__ideas">
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

        <div
          v-if="!noMoreLoaded"
          class="d-flex justify-content-center align-items-center explore__more"
          @click="loadMore"
        >
          <span v-show="!moreLoading">загрузить еще</span>
          <v-loading v-show="moreLoading" />
        </div>
        <div
          v-else
          class="p-4 d-flex align-items-center flex-column"
        >
          <span class="text-muted"> 🤷 больше идей нет </span>
          <nuxt-link
            :to="localePath({ name: 's-ideas-editor' })"
            class="mt-3"
          >
            <v-button type="muted" :icon="['fas', 'plus']">
              {{ $t('page.ideas.explore.new') }}
            </v-button>
          </nuxt-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store }) {
    await store.dispatch('ideas/getIdeas')
  },

  data: () => ({
    moreLoading: false,
    noMoreLoaded: false,
    filter: {
      page: 1,
      sortBy: 'date'
    }
  }),

  computed: {
    ...mapGetters({
      ideas: 'ideas/list'
    })
  },

  methods: {
    async loadMore() {
      this.filter.page++
      this.moreLoading = true

      let ideas = await this.$store.dispatch('ideas/getIdeas', this.filter)

      if (ideas.length === 0) {
        this.filter.page++
        this.noMoreLoaded = true
        return false
      }

      this.moreLoading = false
    }
  },
}
</script>

<style lang="scss" scoped>
.explore {
  &__ideas {
    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
  }

  &__more {
    padding: 1rem;
    margin: -1rem;
    color: var(--color-primary);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
