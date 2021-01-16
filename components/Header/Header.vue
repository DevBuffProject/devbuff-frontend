<template>
  <header class="flex items-center bg-blueGray-800 py-4">
    <div class="container mx-auto flex items-center">
      <div class="flex items-center">
        <nuxt-link :to="localePath({ name: 'ideas' })">
          <v-logo src="/logos/logo-white.svg" class="h-10" />
        </nuxt-link>
        <div
          v-ripple
          class="cursor-pointer text-lg w-12 h-8 flex items-center justify-center rounded ml-6 text-purple-500 dark:text-yellow-500"
          @click="toggleDarkMode"
        >
          <v-icon :icon="['fas', $colorMode.preference === 'light' ? 'moon' : 'sun']" />
        </div>
      </div>
      <div :class="[$style.section, 'dark']">
        <nav v-if="isAuthorized" class="flex items-center">
          <nuxt-link
            v-if="isAdmin"
            v-ripple
            :class="$style.link"
            :to="localePath({ name: 's-admin' })"
          >
            admin
            <span class="ml-1" v-if="pendingIdeas.length > 0">({{ pendingIdeas.length }})</span>
          </nuxt-link>
          <nuxt-link
            v-ripple
            :class="$style.link"
            :active-class="$style.link_active"
            :exact="false"
            :to="localePath({ name: 'ideas' })"
          >
            {{  $t('components.header.ideas')  }}
          </nuxt-link>
          <nuxt-link
            v-ripple
            :class="[$style.link, 'mr-3']"
            :active-class="$style.link_active"
            :to="localePath({ name: 's-dashboard' })"
          >
            {{ $t('components.header.dashboard') }}
          </nuxt-link>
          <nuxt-link :class="$style.new" :to="localePath({ name: 's-editor' })">
            <v-button type="muted" :icon="['fas', 'plus']"> {{ $t('components.header.create') }} </v-button>
          </nuxt-link>
          <nuxt-link :to="localePath({ name: 's-profile' })">
            <v-avatar v-ripple.dark :avatar="this.$store.getters['user/profile'].id" />
          </nuxt-link>
        </nav>

        <div v-else class="flex items-center">
          <v-button
            rounded
            type="contrast"
            :icon="['fab', 'github']"
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
    toggleDarkMode(e) {
      this.$colorMode.preference = this.$colorMode.preference === 'dark' ? 'light' : 'dark'
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

<style module>
.link {
  --ripple-color: theme('colors.primary.DEFAULT');
  --ripple-weight: .1;
  @apply px-4 py-1 ml-1 font-medium transition-colors rounded;
  @apply hover:text-primary text-blueGray-50 !important;
}
.link_active {
  @apply bg-primary bg-opacity-10 text-primary !important;
}

.new {
  @apply mr-4 pl-4 border-l border-gray-700;
}

.section {
  @apply flex items-center justify-end w-full;
}

.logo {
  height: 30px;
  @apply w-auto;
}
</style>
