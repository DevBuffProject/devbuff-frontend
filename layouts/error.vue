<template>
  <div class="error-page font-thin">
    <div v-if="screen">
      <div class="d-flex align-items-baseline">
        <span class="error-page__emoji mr-3"> {{ screen.emoji }} </span>
        <span class="error-page__message"> {{ screen.message }} </span>
      </div>
      <v-button
        v-if="error.statusCode === 401"
        :icon="['fab', 'github']"
        type="dark"
        rounded
        @click="$store.dispatch('auth/authorize')"
        class="error-page__button"
      >
        войти через github
      </v-button>
    </div>

    <div v-else>
      <div class="d-flex align-items-baseline">
        <span class="error-page__emoji mr-3"> 🤕 </span>
        <span class="error-page__message"> что-то пошло не так </span>
      </div>
      <nuxt-link :to="{ name: 'index' }">
        <v-button
          class="error-page__button"
          type="muted"
        >
          на главную
        </v-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'white-screen',

    data: () => ({
      errors: {
        401: {
          emoji: '🛡',
          message: 'нужно авторизоваться'
        },
        404: {
          emoji: '🤷',
          message: 'не найдено'
        }
      }
    }),

    computed: {
      screen() {
        return this.errors[this.error.statusCode] || null
      }
    }
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
}
</style>
