<template>
  <div class="explore">
    <v-toolbar class="mb-4">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> {{ $t('page.dashboard.title') }} </h3>
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
      <v-card style="width: 500px;">
        <div v-if="ideas" class="dashboard__ideas">
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
        >
          <div class="mb-3"> {{ $t('page.dashboard.noIdeas') }} </div>
          <nuxt-link :to="localePath({ name: 's-ideas-editor' })">
            <v-button
              type="flat-primary"
              :icon="['fas', 'plus']"
            >
              {{ $t('page.ideas.explore.new') }}
            </v-button>
          </nuxt-link>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store }) {
    await store.dispatch('ideas/getOwnIdeas')
  },

  computed: {
    ...mapGetters({
      ideas: 'ideas/own'
    })
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &__ideas {
    margin: -2rem;
    padding: 1rem 1rem;
    &:not(:last-of-type) {
      margin-bottom: 0rem;
    }
  }

  &__idea {
    border-bottom: 1px solid var(--color-muted-accent);
  }
}
</style>
