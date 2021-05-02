<template>
  <div>
    <app-dialog-view v-bind="overlayRouting" />
    <app-notification-view />
    <div
      :class="[$style.Grid, 'bg-gray-50 dark:bg-blueGray-900 bg-opacity-90']"
    >
      <layout-header :progress="progress" />
      <main class="mt-10 grid gap-6 grid-cols-10 container mx-auto">
        <layout-sidebar class="sticky top-8 col-span-2" />
        <div class="col-span-8">
          <nuxt />
        </div>
      </main>
      <layout-footer class="mt-3" />
    </div>
  </div>
</template>

<script>
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
  watch: {
    '$nuxt.isOffline'() {
      if (this.$nuxt.isOffline) {
        this.$notify.danger({
          title: "🤬 the internet doesn't work",
          text: "and even the icon didn't load, keep calm",
        })
      } else {
        this.$notify.success({
          title: '😐 and now the internet is back',
          text: 'continue keep calm)',
        })
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
