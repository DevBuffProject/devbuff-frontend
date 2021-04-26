<template>
  <div class="font-thin">
    <div v-if="screen">
      <div class="d-flex align-baseline">
        <span class="text-3xl mr-3"> {{ screen.emoji }} </span>
        <span class="text-4xl">
          <span> {{ screen.message }} </span>
          <div v-if="isDev" class="mb-3">
            {{ error.message }}
          </div>
        </span>
      </div>

      <atomic-button
        v-if="error.statusCode === 401"
        type="muted"
        @click="$store.dispatch('auth/authorize')"
      >
        {{ $t('layouts.error.oAuth.gitHub') }}
      </atomic-button>

      <nuxt-link v-else to="/">
        <atomic-button type="muted">
          {{ $t('layouts.error.action.index') }}
        </atomic-button>
      </nuxt-link>
    </div>

    <div v-else>
      <div class="d-flex align-baseline">
        <span class="error-page__emoji mr-3"> 🤕 </span>
        <span class="error-page__message"> что-то пошло не так </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'white-screen',
  props: {
    error: {
      type: [Object, String],
      default: () => {},
    },
  },
  data: () => ({
    errors: {
      401: {
        emoji: '🛡',
        message: 'нужно авторизоваться',
      },
      404: {
        emoji: '🤷',
        message: 'не найдено',
      },
    },
  }),
  computed: {
    screen() {
      return (
        this.errors[this.error.statusCode] || {
          emoji: '🤕',
          message: 'произошло что-то плохое',
        }
      )
    },
    isDev() {
      return this.$config.IS_DEV
    },
  },
  created() {
    // this.$nuxt.context.redirect('/ideas', 404)
    this.$store.commit('setError', 404, { root: true })
  },
}
</script>
