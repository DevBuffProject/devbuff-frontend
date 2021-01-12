<template>
  <header class="dark header flex items-center bg-gray-900">
    <div class="container mx-auto flex items-center">
      <div class="flex items-center">
        <v-logo src="/logos/logo-white.svg" class="header__logo mr-3" />
<!--          <v-switcher-->
<!--            class="header__lang-switcher"-->
<!--            :values="availableLocales"-->
<!--            :value="locale"-->
<!--            @change="setLocale"-->
<!--          />-->
      </div>
      <div class="header__section">
        <nav v-if="isAuthorized" class="flex items-center">
          <nuxt-link
            v-if="isAdmin"
            v-ripple
            class="header__link"
            :to="localePath({ name: 's-admin' })"
          >
            admin
            <span class="ml-1" v-if="pendingIdeas.length > 0">({{ pendingIdeas.length }})</span>
          </nuxt-link>
          <nuxt-link
            v-ripple
            class="header__link"
            active-class="header__link--active"
            :exact="false"
            :to="localePath({ name: 'ideas' })"
          >
            {{  $t('components.header.ideas')  }}
          </nuxt-link>
          <nuxt-link
            v-ripple
            class="header__link mr-3"
            active-class="header__link--active"
            :to="localePath({ name: 's-dashboard' })"
          >
            {{ $t('components.header.dashboard') }}
          </nuxt-link>
          <nuxt-link class="header__new-btn" :to="localePath({ name: 's-editor' })">
            <v-button type="muted" :icon="['fas', 'plus']"> {{ $t('components.header.create') }} </v-button>
          </nuxt-link>
          <nuxt-link :to="localePath({ name: 's-profile' })">
            <v-avatar v-ripple :avatar="this.$store.getters['user/profile'].id" />
          </nuxt-link>
        </nav>

        <div v-else class="flex items-center">
          <v-button
            type="contrast"
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
//@import '@/assets/css/tailwind';
@layer components {
  .header {
    @apply relative;
    height: var(--header-height);

    &__link {
      --ripple-color: theme('colors.primary.DEFAULT');
      --ripple-weight: .1;
      @apply px-3 py-1 font-medium transition-colors rounded;
      @apply hover:text-primary text-gray-600 #{!important};
    }
    &__link--active {
      @apply bg-primary bg-opacity-10 text-primary #{!important};
    }

    &__new-btn {
      @apply mr-4 pl-4 border-l border-gray-700;
    }

    &__section {
      @apply flex items-center justify-end w-full;
    }

    &__logo {
      height: 30px;
      @apply w-auto;
    }
  }
}
</style>
