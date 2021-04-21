<template>
  <div :class="[$style.Grid, 'bg-gray-50 dark:bg-blueGray-900 bg-opacity-90']">
    <div>
      <app-dialog-view v-bind="overlayRouting" />
      <layout-header :progress="progress" />
    </div>
    <main class="mt-10 grid gap-6 grid-cols-10 container mx-auto">
      <div class="col-span-2">
        <layout-sidebar class="sticky top-8" />
      </div>
      <div class="col-span-8">
        <nuxt />
      </div>
    </main>
    <layout-footer class="mt-3" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bus from '~/app/event-bus'
import overlayRoutes from '~/app/overlay-routes'

export default {
  data: () => ({
    progress: false,
    overlayRouting: {
      routerConfig: { queryParam: 'act' },
      routes: overlayRoutes,
    },
  }),
  computed: {
    ...mapGetters('auth', ['isAdmin']),
    ...mapGetters('user', ['isAuthorized', 'profile', 'fullName']),
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
