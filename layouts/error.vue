<template>
  <div class="error-page font-thin">
    <div v-if="screen">
      <div class="d-flex align-baseline">
        <span class="error-page__emoji mr-3"> {{ screen.emoji }} </span>
        <span class="error-page__message">
          <span> {{ screen.message }} </span>
          <div v-if="isDev" class="mb-3 error-page__status-text">
            {{ error.message }}
          </div>
        </span>
      </div>

      <v-button
        v-if="error.statusCode === 401"
        :icon="['fab', 'github']"
        type="dark"
        rounded
        class="error-page__button"
        @click="$store.dispatch('auth/authorize')"
      >
        {{ $t('layouts.error.oAuth.gitHub') }}
      </v-button>

      <nuxt-link v-else to="/">
        <v-button class="error-page__button" type="muted">
          {{ $t('layouts.error.action.index') }}
        </v-button>
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
  props: ['error'],

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
      return this.$config.isDev
    },
  },
}
</script>

<style lang="scss" scoped>
.error-page {
  --emoji-size: 4rem;

  height: 100vh;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  &__button {
    margin-left: calc(1rem + var(--emoji-size));
  }

  &__message {
    position: relative;
    font-size: 2.3rem;
  }

  &__emoji {
    font-size: var(--emoji-size);
  }

  &__status-text {
    font-size: 1rem;
    color: var(--color-danger);
    max-width: 400px;
    max-height: 200px;
    overflow: scroll;
    white-space: pre;
    border-radius: 4px;
    border: 1px dashed;
  }
}
</style>
