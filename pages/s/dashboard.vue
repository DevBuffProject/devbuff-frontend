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
       <div style="width: 500px;">
         <v-ideas-list
          v-if="ideas.length > 0"
          :ideas="ideas"
        />
        <v-card
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
        </v-card>
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

  computed: {
    ...mapGetters({
      ideas: 'ideas/own'
    })
  },
}
</script>

<style lang="scss" scoped>
</style>
