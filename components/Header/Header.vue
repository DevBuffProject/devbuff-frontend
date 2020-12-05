<template>
  <header class="header d-flex align-items-center">
    <div class="header__container container">
      <div class="header__section">
        <div class="d-flex align-items-center">
          <div class="mr-3">
            <v-logo class="header__logo" />
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
            class="text header__link color-warning"
            type="muted"
            :to="localePath({ name: 's-admin' })"
            :icon="['fas', 'crown']"
          >
            admin
            <span class="ml-1" v-if="pendingIdeas.length > 0">({{ pendingIdeas.length }})</span>
          </v-link>
          <v-link
            class="text header__link"
            active-class="header__link--active"
            type="muted"
            :exact="false"
            :to="localePath({ name: 'ideas' })"
            :icon="['fas', 'lightbulb']"
          >
            {{  $t('components.header.ideas')  }}
          </v-link>
          <v-link
            class="text header__link"
            active-class="header__link--active"
            type="muted"
            :to="localePath({ name: 's-dashboard' })"
            :icon="['fas', 'project-diagram']"
          >
            {{ $t('components.header.dashboard') }}
          </v-link>
          <nuxt-link
            class="mr-4 mt-1 text header__create-btn"
            :to="localePath({ name: 's-editor' })"
          >
            <v-button type="muted" :icon="['fas', 'plus']">
              создать
            </v-button>
          </nuxt-link>
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
    pendingIdeas() {
      return this.$store.getters['admin/pendingIdeas']
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

  &__logo {
    height: 30px;
    width: auto;
  }

  &__container {
    display: flex;
    align-items: center;
  }

  &__section {
    width: 100%;
    display: flex;
  }

  &__link {
    padding: 1rem 0;
    font-size: .9rem;
    text-transform: lowercase;
    margin-right: 1.5rem;
    opacity: 0.5;
    font-weight: 600;
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

  &__create-btn {
    padding-left: 1rem;
    border-left: 1px solid var(--color-muted);
  }

  &__lang-switcher {
    transform: scale(.85);
  }
}
</style>
