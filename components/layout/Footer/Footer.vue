<template>
  <footer
    class="border-t border-gray-200 bg-white dark:bg-blueGray-800 dark:border-blueGray-700 py-4"
  >
    <div class="container mx-auto">
      <v-status-badge
        v-if="health.status"
        :indicator="health.status.indicator"
        :description="health.status.description"
        :href="health.page.url"
      />
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VFooter',
  computed: {
    ...mapGetters(['health']),
  },

  created() {
    this.$store.dispatch('getHealth', null, { root: true })
  },
}
</script>
