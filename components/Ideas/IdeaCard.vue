<template>
  <v-card
    class="idea"
    v-ripple
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <template #footer>
      <div class="d-flex align-items-center justify-content-between w-100">
        <div class="idea__date muted">
          {{ publishDate | toLocaleDateTime($i18n.locale) }}
        </div>
        <v-link
          v-if="linked"
          :to="localePath({ name: 'ideas-id', params: { id } })"
          :icon="['fas', 'angle-right']"
        >
          посмотреть
        </v-link>
      </div>
    </template>

    <div class="mb-4">
      <div v-if="!linked"> {{ title }}</div>
      <div v-else class="d-flex align-items-center">
        <nuxt-link
          :to="localePath({ name: 'ideas-id', params: { id } })"
          :class="['idea__link', hover && 'idea__link--hover']"
        >
          {{ title }}
        </nuxt-link>
        <v-icon
          :icon="['fas', 'long-arrow-alt-right']"
          :class="['ml-2', 'idea__link-icon', hover && 'idea__link-icon--hover']"
        />
      </div>
    </div>

    <v-label :name="$t('components.ideaCard.description')" class="w-100">
      <div class="idea__description">
        {{ description }}
      </div>
    </v-label>

    <div
      v-if="specialists.length || technologies.length || languages.length"
      class="mt-4"
    >
      <v-label v-if="specialists.length" :name="$t('components.ideaCard.specialists')">
        <span
          v-for="(spec, key) in specialists"
          :key="spec + key + id"
          class="mr-2"
        >
          <v-chip :text="t('specializations.'+spec.name+'.title',spec.name)"/>
        </span>
      </v-label>

      <v-label v-if="technologies.length" :name="$t('components.ideaCard.technologies')" class="mt-3">
        <span
          v-for="(tech, key) in technologies"
          :key="tech + key + id"
          class="mr-2"
        >
          <v-chip :text="tech"/>
        </span>
      </v-label>

      <v-label v-if="languages.length" :name="$t('components.ideaCard.languages')" class="mt-3">
        <span
          v-for="(lang, key) in languages"
          :key="lang + key + id"
          class="mr-2"
        >
          <v-chip :text="t('languages.'+lang.name,lang.name)" :type="hover ? 'auto' : null"/>
        </span>
      </v-label>

    </div>
  </v-card>
</template>

<script>
export default {
  name: 'v-idea-card',

  props: {
    linked: {
      type: Boolean,
      default: true,
    },
    id: {
      type: [String, Number],
      required: true
    },
    publishDate: {
      type: String,
      default: null
    },
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
      default: () => []
    },
  },

  data: () => ({
    hover: false
  }),

  computed: {
    languages() {
      return this.specialists.length
        ? this.specialists.reduce((acc, spec) => {
          spec.languages.forEach(lang => acc.push(lang))
          return acc
        }, [])
        : [];
    },
    technologies() {
      return this.languages.length
        ? this.languages.reduce((acc, lang) => lang.technologies.map(tech => tech.name), [])
        : [];
    }
  },
  methods: {
    t(str, fallbackStr) {
      return this.$t && this.$te
        ? this.$te(str)
          ? this.$t(str)
          : fallbackStr
        : fallbackStr
          ? fallbackStr
          : str
    },
  }
}
</script>

<style lang="scss" scoped>
.idea {
  position: relative;
  padding: 1rem 1rem 1.5rem;
  transition: box-shadow .3s var(--base-transition);

  &:hover {
    box-shadow: 0px 10px 25px -5px rgba(0, 0, 0, .1);
  }

  &__description {
    line-height: 1.2;
    font-weight: 300 !important;
    word-break: break-word;
  }

  &__date {
    font-size: .8rem;
    font-weight: 400;
  }

  &__link {
    text-decoration: none;
    color: var(--color-black);
    border-bottom: 1px solid var(--color-muted);
    font-size: 1.1rem;
    opacity: .5;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: .3s var(--base-transition);
    transition-property: opacity, border-bottom-color, color;
  }

  &__link--hover {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary-tint);
    opacity: 1;
  }

  &__link-icon {
    color: var(--color-black);
    opacity: .1;
    transition: .3s var(--base-transition);
    transition-property: transform, opacity, color;
  }

  &__link-icon--hover {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary-tint);
    transform: translateX(5px);
    opacity: .5;
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
