<template>
  <footer
    class="border-t border-gray-200 bg-white dark:bg-blueGray-800 dark:border-blueGray-700 py-4"
  >
    <div class="container mx-auto">
      <div class="flex justify-between">
        <atomic-status-badge
          v-if="health.status"
          :indicator="health.status.indicator"
          :description="health.status.description"
          :href="health.page.url"
        />

        <div>
          <a href="//vercel.com/" target="_blank" rel="nofollow">
            <img src="/media/vercel-copy.svg" alt="powered by vercel" class="h-8" />
          </a>
        </div>
      </div>
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
