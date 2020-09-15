<template>
  <div class="callback-auth font-thin">
    <div v-if="error">
      <div class="callback-auth__error d-flex align-items-baseline">
        <span class="callback-auth__emoji mr-3"> 😬 </span>
        <span class="callback-auth__status-text"> Что-то пошло не так </span>
      </div>
      <v-button
        class="callback-auth__retry"
        type="muted"
        @click="retryAuth"
      >
        повторить
      </v-button>
    </div>

    <div
      v-else-if="success"
      class="d-flex align-items-center"
    >
      <div class="d-flex align-items-baseline mb-4">
        <span class="callback-auth__emoji mr-3"> 👌 </span>
        <span class="callback-auth__status-text mr-4"> Загрузка </span>
      </div>
    </div>

    <div
      v-else
      class="d-flex align-items-center"
    >
      <div class="d-flex align-items-baseline mb-4">
        <span class="callback-auth__emoji mr-3"> ⏳ </span>
        <span class="callback-auth__status-text mr-4">
          Авторизация <span class="callback-auth__dots" />
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  layout: 'white-screen',

  data: () => ({
    error: false,
    success: false,
  }),

  methods: {
    retryAuth() {
      this.$store.dispatch('auth/authorize')
    },

    getToken() {
      const { $store, $route, $router } = this
      const grant = $route.query.code

      Promise.all([
        $store.dispatch('auth/getToken', { grant }),
        $store.dispatch('user/getProfile')
      ])
      .then(() => {
        this.success = true
        setTimeout(() => $router.push({ name: 's-dashboard' }), 1000)
      })
      .catch(() => this.error = true)
    }
  },

  mounted() {
    this.getToken()
  }
}
</script>

<style lang="scss" scoped>
.callback-auth {
  --emoji-size: 4rem;

  height: 100vh;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  &__retry {
    margin-left: calc(1rem + var(--emoji-size));
  }

  &__status-text {
    position: relative;
    font-size: 2.3rem;
  }

  &__dots {
    position: absolute;
    right: -1rem;
    width: 1rem;
    &:after {
      content: ".";
      animation: dots 3s linear infinite;
      animation-delay: 1s;
    }
  }

  &__emoji {
    font-size: var(--emoji-size);
  }

  @keyframes dots {
    0% {
      content: "."
    }
    25% {
      content: ".."
    }
    50% {
      content: "..."
    }
    75% {
      content: "...."
    }
  }
}
</style>
