<template>
  <div class="h-screen w-full mx-auto my-0 mt-10 font-thin w-[1200px]">
    <atomic-button class="mr-4" @click="$store.dispatch('auth/authorize')">
      init auth
    </atomic-button>
    <atomic-button type="success" @click="login"> login</atomic-button>
    <atomic-button type="warning" @click="refresh"> refresh</atomic-button>
    <atomic-button type="muted" @click="refresh"> refresh</atomic-button>
    <atomic-button type="danger" @click="refresh"> logout</atomic-button>
    <div class="grid grid-cols-2 gap-8">
      <div>
        <h4>tokens</h4>
        <pre
          >{{ $store.getters['auth/tokens'] }}
        </pre>
      </div>

      <div>
        <h4>refresh token:response</h4>
        <pre
          >{{ $store.getters['auth/status'] }}
        </pre>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-8">
      <div>
        <h4>user</h4>
        <pre
          >{{ $store.getters['auth/user'] }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'white-screen',
  data: () => ({
    tokR: null,
    tokRR: null,
  }),
  methods: {
    async login() {
      this.tokR = await this.$store.dispatch('auth/login', {
        code: this.$route.query?.code,
        typeOAuthProvider: this.$route.params?.typeOAuthProvider,
      })
    },
    async refresh() {
      this.tokRR = await this.$store.dispatch(
        'auth/refresh',
        this.$store.getters['auth/tokens'].refreshToken
      )
    },
  },
}
</script>
