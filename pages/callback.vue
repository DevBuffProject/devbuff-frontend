<template>
  <div
    class="h-screen w-full mx-auto my-0 flex items-center justify-center font-thin"
    style="max-width: 450px"
  >
    <div v-if="status === false">
      <span>
        {{ $t('page.callback.status.error.text') }}
      </span>
      <v-button type="muted" @click="retryAuth">
        {{ $t('page.callback.status.error.retryButton') }}
      </v-button>
    </div>

    <div v-else-if="status === true">
      {{ $t('page.callback.success.text') }}
    </div>

    <div v-else>
      {{ $t('page.callback.processing.text') }}
    </div>
  </div>
</template>

<script>
export default {
  layout: 'white-screen',
  data: () => ({
    status: null,
  }),
  created() {
    this.getToken()
  },
  methods: {
    retryAuth() {
      this.$store.dispatch('auth/authorize')
    },

    async getToken() {
      const { $store, $route, $router } = this
      const grant = $route.query.code
      const visited = localStorage.getItem('visited')

      try {
        await $store.dispatch('auth/getToken', { grant })
        this.status = true
      } catch (e) {
        this.status = false
      }

      let redirectPath = this.localePath({ name: 's-dashboard' })

      if (!visited) {
        redirectPath = this.localePath({
          name: 's-profile',
          query: { act: 'edit' },
        })

        localStorage.setItem('visited', true)
      }

      setTimeout(() => $router.push(redirectPath), 1000)
    },
  },
}
</script>
