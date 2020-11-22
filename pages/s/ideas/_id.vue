<template>
  <div class="container">
    idea
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store, route }) {
    await store.dispatch('ideas/getIdea', route.params.id)
  },

  computed: {
    ...mapGetters({
      ideas: 'ideas/idea'
    })
  },
}
</script>

<style lang="css" scoped>
</style>
