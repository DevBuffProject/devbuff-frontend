<template>
  <div :class="[$style.Grid, 'bg-white dark:bg-blueGray-900']">
    <div>
      <v-dialog-container />
      <v-header :progress="progress" />
      <!--      <v-subheader :nav="nav" />-->
    </div>
    <main class="mt-10 grid gap-6 grid-cols-10 container mx-auto">
      <div class="col-span-2">
        <v-sidebar />
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

export default {
  data: () => ({
    progress: false,
  }),
  computed: {
    ...mapGetters('auth', ['isAdmin']),
    ...mapGetters('user', ['isAuthorized', 'profile', 'fullName']),
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
