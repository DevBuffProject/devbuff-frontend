<template>
  <div class="idea">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <nuxt-link to="/" class="idea__link">
        {{ title }}
      </nuxt-link>
    </div>

    <div class="idea__description mb-3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid corporis debitis doloremque, error exercitationem, fugit harum ipsum iure libero magnam minus molestiae optio quis rem repellat repellendus. Numquam, suscipit.
    </div>

    <div class="d-flex justify-content-between w-100 idea__languages">
      <v-chip
        v-for="(lang, key) in languages"
        :key="lang + key"
        :text="$t('languages.' + lang)"
        class="mr-2"
        type="auto"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-idea-card',

  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    specialists: {
      type: Array,
      required: true
    },
  },

  computed: {
    languages() {
      const { specialists } = this

      return specialists.reduce((acc, spec) => spec.languages.map(lang => lang.name), [])
    }
  }
}
</script>

<style lang="scss" scoped>
.idea {
  position: relative;
  transition: box-shadow .3s var(--base-transition);
  &:hover { box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, .1); }

  &__link {
    text-decoration: none;
    color: var(--color-black);
    border-bottom: 1px solid var(--color-black-fade);
    opacity: .65;
    transition: border-bottom-color 0.3s var(--base-transition);
    transition-property: opacity, border-bottom-color, color;
    &:hover {
      color: var(--color-primary);
      border-bottom-color: var(--color-primary-tint);
      opacity: 1;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
    }
  }

  &__languages {
    margin-top: 1rem;
    margin-right: -1rem;
    margin-left: -1rem;
    padding: 1rem;
    transition: background-color .3s var(--base-transition);
  }

  &:hover &__languages {
    background-color: var(--color-muted-fade);
  }
}
</style>
