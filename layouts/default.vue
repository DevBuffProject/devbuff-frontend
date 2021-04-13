<template>
  <div :class="[$style.Grid, 'bg-gray-50 dark:bg-blueGray-900 bg-opacity-90']">
    <div>
      <v-dialog-container :preloaded-dialog="queryActionDialog" />
      <v-header :progress="progress" />
    </div>
    <main class="mt-10 grid gap-6 grid-cols-10 container mx-auto">
      <div class="col-span-2">
        <v-sidebar class="sticky top-8" />
      </div>
      <div class="col-span-8">
        <nuxt />
      </div>
    </main>
    <v-footer class="mt-3" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bus from '~/app/event-bus'
// import qs from '~/app/utils/url'

export default {
  data: () => ({
    progress: false,
    dialogs: {
      settings: () => import('~/components/dialogs/User/Settings.vue'),
    },
  }),
  computed: {
    ...mapGetters('auth', ['isAdmin']),
    ...mapGetters('user', ['isAuthorized', 'profile', 'fullName']),
    queryActionDialog() {
      const { act } = this.$route.query
      return this.dialogs[act]
    },
    nav() {
      const nav = [
        {
          title: this.$t('components.header.overview'),
          icon: 'menu_book',
          to: this.localePath({ name: 'ideas' }),
          exact: true,
        },
      ]

      if (this.isAuthorized)
        nav.push({
          title: this.$t('components.header.dashboard'),
          to: this.localePath({ name: 's-dashboard' }),
          exact: true,
        })

      if (this.isAdmin)
        nav.push({
          title: 'admin',
          to: this.localePath({ name: 'a' }),
        })

      return nav
    },
  },
  watch: {
    async '$route.query'() {
      const { queryActionDialog } = this
      if (!queryActionDialog) return false

      await this.$dialog.push(queryActionDialog)

      console.log(window.history)
      if (window.history.length > 2) {
        this.$router.back()
      } else {
        console.log('LOOOG')
      }
    },
  },
  created() {
    bus.on('progress:start', () => (this.progress = true))
    bus.on('progress:finish', () => (this.progress = false))
  },
}
</script>

<style module>
.Grid {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
