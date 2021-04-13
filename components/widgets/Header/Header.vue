<template>
  <header
    class="flex flex-col items-center bg-white dark:bg-blueGray-800"
    style="box-shadow: 0 5px 8px #00098000, 0 5px 16px rgb(0 9 128 / 5%)"
  >
    <div class="container mx-auto flex items-center py-4">
      <div class="flex items-center w-full">
        <nuxt-link :to="localePath({ name: 'ideas' })">
          <v-logo src="/logos/logo-dark.svg" class="h-10 dark:hidden" />
          <v-logo src="/logos/logo-white.svg" class="h-10 hidden dark:block" />
        </nuxt-link>
        <v-switcher
          :value="locale"
          :values="availableLocales"
          class="transform scale-90 ml-5"
          @change="setLocale"
        />
      </div>
      <div class="flex items-center">
        <div
          class="flex items-center border-r border-gray-200 dark:border-blueGray-600 mr-2 pr-6"
        >
          <div
            class="cursor-pointer text-lg w-12 h-8 flex items-center justify-center rounded ml-6"
          >
            <v-color-mode-switcher />
          </div>
        </div>
        <nav v-if="isAuthorized" class="flex items-center">
          <nuxt-link
            :class="[
              'mr-4 ml-4 transition-all text-gray-500 dark:text-blueGray-50 hover:text-primary rounded',
              'border-2 border-gray-200 hover:border-primary dark:border-blueGray-600 dark:hover:border-primary',
              'transform active:scale-95',
            ]"
            :to="localePath({ name: 's-editor' })"
          >
            <div class="py-1 px-4 flex items-center">
              <v-icon :icon="['fas', 'plus']" class="mr-4" />
              <span class="font-semibold">
                {{ $t('components.header.create') }}
              </span>
            </div>
          </nuxt-link>
        </nav>
      </div>
    </div>
    <i class="w-full h-px">
      <v-progress v-show="progress" />
    </i>
  </header>
</template>

<script>
export default {
  name: 'VHeader',
  props: {
    progress: {
      type: Boolean,
      default: false,
    },
    // TODO: props, links, avatar, button slot and avatar
  },
  data() {
    return {
      localeLoading: false,
      locale: this.$i18n.locale,
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
    availableLocales() {
      return this.$i18n.locales.map((locale) => ({
        title: locale.name,
        value: locale.code,
      }))
    },
  },
  methods: {
    authorize() {
      this.$store.dispatch('auth/authorize')
    },
    async setLocale(locale) {
      await this.$i18n.setLocale(locale)
      this.locale = locale
    },
  },
}
</script>

<style module>
.link_active {
  @apply bg-primary bg-opacity-10 text-primary !important;
}

.section {
  @apply flex items-center justify-end w-full;
}

.logo {
  height: 30px;
  @apply w-auto;
}
</style>
