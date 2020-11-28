<template>
  <header class="header">
    <div class="header__container container">
      <div class="header__section">
        <div class="d-flex align-items-center">
          <div class="mr-3">
            <v-logo />
          </div>
          <v-switcher
            class="header__lang-switcher"
            :values="availableLocales"
            :value="locale"
            @change="setLocale"
          />
          <transition name="fade">
            <v-loading class="muted ml-3" v-show="localeLoading" />
          </transition>
        </div>
      </div>
      <!-- <div class="header__section d-flex justify-content-center">

      </div> -->
      <div class="header__section d-flex align-items-center justify-content-end">
        <div v-if="isAuthorized" class="d-flex align-items-center">
          <v-link
            v-if="isAdmin"
            class="text header__link"
            active-class="header__link--active"
            type="muted"
            :to="localePath({ name: 's-admin' })"
            :icon="['fas', 'crown']"
          >
            admin
          </v-link>
          <v-link
            class="text header__link"
            active-class="header__link--active"
            type="muted"
            :to="localePath({ name: 'ideas' })"
            :icon="['fas', 'lightbulb']"
          >
            {{  $t('components.header.ideas')  }}
          </v-link>
          <v-link
            class="mr-4 text header__link"
            active-class="header__link--active"
            type="muted"
            :to="localePath({ name: 's-dashboard' })"
            :icon="['fas', 'project-diagram']"
          >
            {{ $t('components.header.dashboard') }}
          </v-link>
          <nuxt-link :to="localePath({ name: 's-profile' })">
            <v-avatar :avatar="this.$store.getters['user/profile'].id" />
          </nuxt-link>
        </div>

        <div v-else class="d-flex align-items-center">
          <v-button
            type="dark"
            :icon="['fab', 'github']"
            rounded
            @click="authorize"
          >
            {{ $t('page.index.oAuth.gitHub') }}
          </v-button>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'v-header',

  data() {
    return {
      localeLoading: false,
      locale: this.$i18n.locale
    }
  },

  computed: {
    isAuthorized() {
      return this.$store.getters['user/isAuthorized']
    },
    isAdmin() {
      return this.$store.getters['auth/isAdmin']
    },
    avatar() {
      return this.$store.getters['user/profile'].avatar
    },
    availableLocales () {
      return this.$i18n.locales.map(locale => ({
        title: locale.name,
        value: locale.code
      }))
    }
  },

  methods: {
    authorize() {
      this.$store.dispatch('auth/authorize')
    },
    async setLocale(locale) {
      try {
        this.$router.beforeEach((to, from, next) => {
          this.localeLoading = false
          next()
        })
        this.localeLoading = true
        await this.$i18n.setLocale(locale)
        this.locale = locale
      } catch (e) {
        this.localeLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--color-background-contrast);
  position: relative;
  height: var(--header-height);
  border-bottom: 1px solid var(--color-muted-accent);

  &__container {
    display: flex;
    align-items: center;
  }

  &__section {
    width: 100%;
    display: flex;
  }

  &__link {
    padding: .2rem 1rem;
    font-size: .9rem;
    text-transform: lowercase;
    border-radius: 4px;
    margin-right: .3rem;
    opacity: 0.5;
    transition-property: background-color, color, opacity;
    transition: .3s var(--base-transition);

    &:hover {
      opacity: 1;
    }

    &--active {
      background-color: var(--color-primary-muted);
      color: var(--color-primary) !important;
      opacity: 1;
    }
  }

  &__lang-switcher {
    transform: scale(.85);
  }
}
</style>
