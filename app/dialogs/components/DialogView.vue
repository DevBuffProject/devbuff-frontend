<template>
  <div class="overflow-x-hidden">
    <transition name="fade">
      <div
        v-if="dialogs.length"
        :class="[
          'fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-75 z-40',
          'flex items-center justify-center',
        ]"
      >
        <!--        <div class="fixed h-full top-0 left-0 w-1/2"></div>-->
      </div>
    </transition>
    <!--    <transition :css="false" @leave="(el, done) => motions.cube.leave(done)">-->
    <div
      v-if="dialogs.length && dialog.component"
      ref="container"
      data-target-container
      :class="[
        'fixed top-0 left-0 overflow-y-auto overflow-x-hidden h-screen w-screen z-40',
        'flex items-center justify-center overflow-x-hidden',
      ]"
      style="overflow-y: overlay"
    >
      <div
        class="absolute h-full top-0 right-0 w-1/2 flex justify-end group cursor-pointer"
        @click="close"
      >
        <svg-icon
          name="outline/x"
          :class="[
            'fixed top-0 right-0',
            'm-10 cursor-pointer text-3xl rounded-full inline-block',
            'text-white cursor-pointer opacity-50 relative z-50',
            'transition-opacity group-hover:opacity-100',
          ]"
        />
      </div>

      <div class="w-full m-auto" style="min-width: 320px; max-width: 600px">
        <div v-motion-slide-top class="relative z-50">
          <component :is="dialog.component" v-bind="dialog.props" />
        </div>
      </div>
    </div>
    <!--    </transition>-->
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
        this.$router.replace(prevRoute)
        this.prevRoute = null
      } else if (query.act) {
        const { query } = $route
        this.$router.replace({
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
