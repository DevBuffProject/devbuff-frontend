<template>
  <div>
    <app-dialog-view v-bind="overlayRouting" />
    <div
      :class="[
        'fixed bottom-10 right-10 z-50 rounded-md max-w-[400px]',
        'bg-white dark:bg-blueGray-800 overflow-hidden shadow-2xl',
      ]"
    >
      <div class="flex">
        <div :class="['bg-danger text-white flex items-center p-4']">
          <svg-icon name="notifications/alert-triangle" />
        </div>
        <div class="dark:text-white p-4">
          <div class="text-sm font-semibold mb-2">Some services are down</div>
          <div class="text-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            ea eos magni modi, officia quaerat quia ratione sapiente suscipit
            ut. Assumenda corporis cupiditate deleniti laborum maxime
            praesentium soluta veritatis, voluptatibus!
          </div>
        </div>
      </div>
    </div>
    <div
      :class="[$style.Grid, 'bg-gray-50 dark:bg-blueGray-900 bg-opacity-90']"
    >
      <layout-header :progress="progress" />
      <main class="mt-10 grid gap-6 grid-cols-10 container mx-auto">
        <layout-sidebar class="sticky top-8 col-span-2" />
        <div class="col-span-8">
          <nuxt-link to="/err">errr</nuxt-link>
          <nuxt />
        </div>
      </main>
      <layout-footer class="mt-3" />
    </div>
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
    this.$router.onError(() => {
      console.log('error')
    })
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
