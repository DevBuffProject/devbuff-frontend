<template>
  <div class="overflow-x-hidden">
    <transition name="fade">
      <div
        v-if="dialogs.length"
        :class="[
          'fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-75 z-40',
          'flex items-center justify-center',
        ]"
      />
    </transition>
    <transition name="scale">
      <div
        v-if="dialogs.length && dialog.component"
        ref="container"
        data-target-container
        :class="[
          'fixed top-0 left-0 overflow-y-auto overflow-x-hidden h-screen w-screen z-50',
          'flex items-center justify-center overflow-x-hidden',
        ]"
        style="overflow-y: overlay"
      >
        <div class="w-full m-auto" style="min-width: 320px; max-width: 600px">
          <div class="relative">
            <component :is="dialog.component" v-bind="dialog.props" />
            <atomic-material-icon
              name="close"
              type="round"
              :class="[
                'absolute right-0 top-0 cursor-pointer mt-6 mr-6 p-4 text-lg rounded-full',
                'bg-gray-200 dark:bg-blueGray-900 cursor-pointer opacity-50',
                'transition-opacity hover:opacity-100',
              ]"
              @click="close"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import bus from '../event-bus'

export default {
  name: 'VDialogView',
  props: {
    routerConfig: {
      type: Object,
      default: () => ({ queryParam: 'act' }),
    },
    routes: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    prevRoute: null,
    dialogs: [],
  }),
  computed: {
    container() {
      return this.$refs.container
    },
    dialog() {
      return this.dialogs[this.dialogs.length - 1]
    },
  },
  watch: {
    dialogs: {
      handler() {
        this.toggleDocumentOverflow()
      },
    },
  },
  created() {
    const route = this.$route
    this.initListeners()
    this.resolveDialogByRoute(route)
    this.watchNavigation(route)
  },
  methods: {
    initListeners() {
      bus.on('dialog:push', this.push)
      bus.on('dialog:close', this.close)
      bus.on('dialog:kill', this.kill)
      bus.on('dialog:scrollTop', this.scrollTop)
    },
    push(dialog) {
      this.dialogs.push(dialog)
    },
    close() {
      this.goToBackgroundRoute()
      this.dialogs.pop()
    },
    kill() {
      this.goToBackgroundRoute()
      this.dialogs = []
    },
    scrollTop() {
      setTimeout(
        () => this.container.scrollTo({ top: 0, behavior: 'smooth' }),
        100
      )
    },
    goToBackgroundRoute() {
      const { prevRoute, $route } = this
      const { query } = $route
      const { routerConfig } = this

      if (prevRoute) {
        this.$router.push(prevRoute)
        this.prevRoute = null
      } else if (query.act) {
        const { query } = $route
        this.$router.push({
          ...$route,
          query: { ...query, [routerConfig.queryParam]: undefined },
        })
      }
    },
    watchNavigation() {
      const { routerConfig } = this
      this.$router.beforeResolve(async (to, from, next) => {
        if (to.query[routerConfig.queryParam]) {
          this.prevRoute = from
          await this.resolveDialogByRoute(to)
          next()
        } else {
          if (this.dialogs.length) this.close()
          next()
        }
      })
    },
    resolveDialogByRoute(route) {
      const dialogRoute = this.matchRouteDialog(route)
      const dialogLocaleRoute = dialogRoute
        ? this.localeRoute(dialogRoute)
        : null

      if (dialogLocaleRoute) {
        const matchedComponents = this.$router.getMatchedComponents(
          dialogLocaleRoute
        )
        const component = matchedComponents.pop()
        const resolved = component()
        this.push({ component: () => Promise.resolve(resolved) })
      }
    },
    matchRouteDialog(route) {
      const { routerConfig, routes } = this
      const { query } = route
      const dialogName = query[routerConfig.queryParam]
      const dialog = routes[dialogName]

      return dialog || null
    },
    toggleDocumentOverflow() {
      const overflow =
        window.CSS && window.CSS.supports('overflow', 'overlay')
          ? 'overlay'
          : 'auto'

      window.document.documentElement.style.overflowY =
        this.dialogs.length > 0 ? 'hidden' : overflow
    },
  },
}
</script>
