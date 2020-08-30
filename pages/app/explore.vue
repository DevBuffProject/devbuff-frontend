<template>
  <section>
    <v-ideas-list
      :ideas="ideas"
      style="width: 500px;"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store }) {
    store.commit('setPageName', 'Идеи')
    process.server && await store.dispatch('ideas/getIdeas')
  },

  computed: {
    ...mapGetters({
      ideas: 'ideas/list'
    })
  },

  methods: {

  },

  mounted() {
    this.$store.dispatch('ideas/getIdeas')
  }
}
</script>

<style lang="scss" scoped>
</style>
