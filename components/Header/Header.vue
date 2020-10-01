<template>
  <header class="header">
    <div class="header__container container">
      <div class="header__section">
        <nuxt-link
          v-for="locale in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          class="mr-2 pt-2 header__locale-link"
        >
          {{ locale.name }}
        </nuxt-link>
      </div>
      <div class="header__section d-flex justify-content-center">
        <v-logo />
      </div>
      <v-anim name="fade">
        <div
          v-if="$route.name !== 'index'"
          class="header__section align-items-center justify-content-end"
        >
          <v-link
            class="text header__link"
            active-class="header__link--active"
            type="muted"
            :to="localePath({ name: 's-ideas-explore' })"
            :icon="['fas', 'lightbulb']"
          >
            {{  $t('ideas')  }}
          </v-link>
          <v-link
            class="mr-4 text header__link"
            active-class="header__link--active"
            type="muted"
            :to="localePath({ name: 's-dashboard' })"
            :icon="['fas', 'project-diagram']"
          >
            {{ $t('dashboard') }}
          </v-link>
          <nuxt-link :to="{ name: 's-profile' }">
            <v-avatar />
          </nuxt-link>
        </div>
      </v-anim>
    </div>
  </header>
</template>

<i18n lang="yaml">
  ru:
    ideas: 'Идеи'
    dashboard: 'Ваши идеи'
  en:
    ideas: 'ideas'
    dashboard: 'Dashboard'
</i18n>

<script>
export default {
  name: 'v-header',

  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  position: relative;
  height: var(--header-height);
  border-bottom: 1px solid var(--color-muted);

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

  &__locale-link {
    font-size: 2rem;
    text-decoration: none;
  }
}
</style>
