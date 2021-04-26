<template>
  <div
    class="h-screen w-full mx-auto my-0 flex items-center justify-center font-thin"
    style="max-width: 450px"
  >
    <atomic-button
      @click="
        $auth.loginWith('local', {
          params: { code: $route.query.code, grant_type: 'github_oauth' },
          data: {},
        })
      "
    >
      log in
    </atomic-button>
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
    login() {
      const r = this.$auth.loginWith('local', {
        data: { code: this.$route.query.code, grant_type: 'github_oauth' },
      })

      console.log(r)
    },
    retryAuth() {
      this.$store.dispatch('session/authorize')
    },

    getToken() {
      // const { $store, $route, $router } = this
      //
      // try {
      //   const response = await $store.dispatch(
      //     'session/getToken',
      //     $route.query.code
      //   )
      //   await $store.dispatch('session/checkToken', response.access_token)
      //   this.status = true
      // } catch (e) {
      //   this.status = false
      // }
      //
      // setTimeout(() => $router.push(this.localePath({ name: 'ideas' })), 1000)
    },
  },
}
</script>
