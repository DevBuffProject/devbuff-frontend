<template>
  <div class="explore">
    <v-toolbar class="mb-4">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> Explore </h3>
        </div>
        <div>
          <nuxt-link to="/">
            <v-button :icon="['fas', 'plus']">
              Создать
            </v-button>
          </nuxt-link>
        </div>
      </div>
    </v-toolbar>

    <div class="container">
      <v-ideas-list
        :ideas="ideas"
        style="width: 500px;"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store }) {
    store.commit('setPageName', 'Идеи')
    // process.server && await store.dispatch('ideas/getIdeas')
  },

  computed: {
    ...mapGetters({
      // ideas: 'ideas/list'
    })
  },

  mounted() {
    this.$store.dispatch('ideas/getIdeas')
  }
}
</script>

<style lang="scss" scoped>
</style>
