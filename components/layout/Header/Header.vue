<template>
  <header
    class="flex flex-col items-center bg-white dark:bg-blueGray-800"
    style="box-shadow: 0 5px 8px #00098000, 0 5px 16px rgb(0 9 128 / 5%)"
  >
    <div class="container mx-auto flex items-center py-4">
      <div class="flex items-center w-full">
        <nuxt-link :to="localePath({ name: 'ideas' })">
          <atomic-logo
            v-if="$colorMode.preference === 'light'"
            src="/logos/logo-dark.svg"
            class="h-10"
          />
          <atomic-logo v-else src="/logos/logo-white.svg" class="h-10" />
        </nuxt-link>
        <atomic-switcher
          :value="locale"
          :values="availableLocales"
          class="transform scale-90 ml-5"
          @change="setLocale"
        />
      </div>
      <div class="flex items-center">
        <div
          class="flex items-center border-r border-gray-200 dark:border-blueGray-600 mr-4 pr-6"
        >
          <div
            class="cursor-pointer text-lg w-12 h-8 flex items-center justify-center rounded ml-6"
          >
            <widget-color-switcher />
          </div>
        </div>
        <nav v-if="isAuth" class="flex items-center">
          <nuxt-link
            v-slot="{ isActive, navigate }"
            :to="localePath({ name: 's-editor' })"
          >
            <atomic-button :disabled="isActive" @click="navigate">
              create
            </atomic-button>
          </nuxt-link>
        </nav>
      </div>
    </div>
    <i class="w-full h-px">
      <atomic-loading-progress v-show="progress" />
    </i>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters('auth', ['isAuth', 'isAdmin']),
    availableLocales() {
      return this.$i18n.locales.map((locale) => ({
        title: locale.name,
        value: locale.code,
      }))
    },
  },
  methods: {
    async setLocale(locale) {
      await this.$i18n.setLocale(locale)
      this.locale = locale
    },
  },
}
</script>

<style module>
.section {
  @apply flex items-center justify-end w-full;
}

.logo {
  height: 30px;
  @apply w-auto;
}
</style>
