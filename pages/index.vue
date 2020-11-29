<template>
  <section>
    <div class="slide present pt-5">
      <h1 class="present__heading">
        {{ $t('page.index.title') }}
      </h1>
      <p class="present__app-desc my-5">
        <span class="present__app-name">DevBuff</span> — {{ $t('page.index.description') }}.
        <v-link to="/about"> {{ $t('page.index.action.about') }}</v-link>
      </p>
      <div class="present__controls d-flex flex-column justify-content-center">
        <div class="w-100" v-if="!isAuthorized">
          <v-button
            class="w-100"
            type="dark"
            :icon="['fab', 'github']"
            rounded
            @click="authorize"
          >
            {{ $t('page.index.oAuth.gitHub') }}
          </v-button>
          <v-delimiter text="или" />
        </div>
        <nuxt-link
          :to="localePath({ name: 'ideas' })"
        >
          <v-button
            type="muted"
            :icon="['fas', 'long-arrow-alt-right']"
            rounded
          >
            {{ $t('page.index.action.projects') }}
          </v-button>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'white-screen',

  // middleware: ['guest'],

  computed: {
    isAuthorized() {
      return this.$store.getters['user/isAuthorized']
    }
  },

  methods: {
    authorize() {
      this.$store.dispatch('auth/authorize')
    }
  },

  head() {
    return {
      title: 'Devbuff',
      meta: [
        { hid: 'description', name: 'description', content: this.$t('page.index.action.about') }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap');

.slide {
  height: calc(100vh - var(--header-height));
}

.present {
  max-width: 500px;
  margin: 0 auto;

  &__controls {
    width: fit-content;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__heading {
    font-family: 'Rubik Mono One', sans-serif;
    font-size: 4rem;
    line-height: 1;
    color: #000;
    text-align: center;
  }

  &__app-name {
    font-size: 1.5rem;
    font-weight: bold;
    transform: translateY(3px);
    display: inline-block;
    color: #000;
  }

  &__app-desc {
    position: relative;
    padding-left: 1rem;

    &:before,
    &:after {
      font-weight: bold;
      font-size: 1.5rem;
      transform: translateY(3px);
      color: #000;
      display: inline-block;
    }
  }
}
</style>
