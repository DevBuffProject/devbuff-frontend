<template>
  <div class="dashboard">
    <v-toolbar class="mb-4">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> {{ $t('page.dashboard.title') }} </h3>
        </div>
        <div>
          <v-button :icon="['fas', 'plus']">
            {{ $t('page.ideas.explore.new') }}
          </v-button>
        </div>
      </div>
    </v-toolbar>

    <div class="container">
      <div style="width: 500px;">
        <v-input
          v-model="search"
          type="search"
          placeholder="поиск"
          :icon="['fas', 'search']"
          class="dashboard__search w-100"
        />
      </div>

      <div
        v-if="ideas && ideas.length"
        class="dashboard__ideas"
        style="width: 500px;"
      >
        <v-idea-card
          v-for="idea in ideas"
          :key="idea.id"
          :title="idea.name"
          :publishDate="idea.publishDate || idea.datePublished"
          :description="idea.description"
          :specialists="idea.specialists"
          :id="idea.id"
          class="dashboard__idea"
        />
      </div>
      <div
        v-else
        class="d-flex flex-column align-items-center"
        style="width: 500px;"
      >
        <span class="text-muted"> 🤷 {{ $t('page.dashboard.noIdeas') }} </span>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store }) {
    await store.dispatch('ideas/getOwnIdeas')
  },

  data: () => ({
    search: null
  }),

  computed: {
    ideas() {
      const ideas = this.$store.getters['ideas/own']
      const { search } = this

      if (!search) return ideas

      return ideas.filter(idea => {
        return idea.name.toLowerCase().startsWith(search.toLowerCase())
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &__search {
    margin-bottom: 3rem;
    box-shadow: 0 15px 25px 5px rgba(211, 218, 230, 0.3) !important;
    border-radius: 20px !important;
  }

  &__idea {
    margin-bottom: 1rem;
  }
}
</style>
