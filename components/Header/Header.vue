<template>
  <header class="header">
    <div class="header__container container">
      <v-anim name="fade">
        <div v-if="$route.name !== 'index'" class="header__section">
          <v-input
            type="text"
            placeholder="search"
            placeholder-centered
            :icon="['fas', 'search']"
            muted
          />
        </div>
      </v-anim>
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
            :to="{ name: 's-explore' }"
            :icon="['fas', 'lightbulb']"
          >
            Идеи
          </v-link>
          <v-link
            class="mr-4 text header__link"
            active-class="header__link--active"
            type="muted"
            :to="{ name: 's-dashboard' }"
            :icon="['fas', 'project-diagram']"
          >
            Ваши проекты
          </v-link>
          <nuxt-link :to="{ name: 's-profile' }">
            <v-avatar />
          </nuxt-link>
        </div>
      </v-anim>
    </div>
  </header>
</template>

<script>
export default {
  name: 'v-header'
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
}
</style>
