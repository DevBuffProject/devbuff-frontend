<template>
  <v-card
    class="idea"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <v-label name="название" class="w-100 mb-3">
        <div v-if="!linked"> {{ title }} </div>
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
    </v-label>

    <v-label v-if="publishDate" name="дата создания" class="w-100 mb-3">
      <div class="idea__date">
        {{ publishDate | toLocaleDateTime($i18n.locale) }}
      </div>
    </v-label>

    <v-label name="описание" class="w-100">
      <div class="idea__description">
        {{ description }}
      </div>
    </v-label>

    <div
      v-if="specialists.length || technologies.length || languages.length"
      class="mt-4"
    >
      <v-label v-if="specialists.length" name="Специалисты">
        <span
          v-for="(spec, key) in specialists"
          :key="spec.name + key"
          class="mr-2"
        >
          <v-chip :text="spec.name" />
        </span>
      </v-label>

      <v-label v-if="technologies.length" name="Технологии" class="mt-3">
        <span
          v-for="(tech, key) in technologies"
          :key="tech.name + key"
          class="mr-2"
        >
          <v-chip :text="tech" />
        </span>
      </v-label>

      <v-label v-if="languages.length" name="Языки программирования" class="mt-3">
        <span
          v-for="(lang, key) in languages"
          :key="lang.name + key"
          class="mr-2"
        >
          <v-chip :text="lang.name" :type="hover ? 'auto' : null" />
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
      type: [ String, Number ],
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
    font-size: 1rem !important;
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
    border-bottom: 1px solid var(--color-black-fade);
    font-size: 1.1rem;
    opacity: .5;
    display: inline-block;
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
