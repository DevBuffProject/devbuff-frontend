<template>
  <div
    class="v-idea"
    :class="{ 'v-idea--state_hover': hover }"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <div class="flex">
      <v-image size="75px" class="v-idea__image" :src="'//source.unsplash.com/random?logo&key' + id" />
      <div class="w-full">
        <div v-if="!linked"> {{ title }}</div>
        <nuxt-link
          :to="localePath({ name: 'ideas-id', params: { id } })"
          class="v-idea__link"
          :class="{ 'v-idea__link--state_hover': hover }"
        >
          {{ title }}
        </nuxt-link>
        <div class="v-idea__publish-date">
          {{ publishDate | toLocaleDateTime($i18n.locale) }}
        </div>

        <div class="v-idea__description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit felis, lobortis ut purus ut, molestie suscipit sapien. Nulla nec vehicula metus, ut lacinia augue. Mauris quam risus, vulputate luctus velit sit amet, rhoncus sollicitudin enim. In varius rutrum tellus, ac viverra eros hendrerit eu. Nunc quis metus vitae velit molestie semper </div>

        <div v-if="specialists.length || technologies.length || languages.length" class="flex w-full">
          <v-label v-if="specialists.length" :name="$t('components.ideaCard.specialists')" class="v-idea__labels">
            <div class="v-idea__labels-list">
              <v-chip
                v-for="(spec, key) in specialists"
                :key="spec + key + id"
                :text="t('specializations.'+spec.name+'.title',spec.name)"
                class="v-idea__label"
              />
            </div>
          </v-label>

          <v-label v-if="technologies.length" :name="$t('components.ideaCard.technologies')" class="v-idea__labels">
            <div class="v-idea__labels-list">
              <v-chip
                v-for="(tech, key) in technologies"
                :key="tech + key + id"
                :text="tech"
                class="v-idea__label"
              />
            </div>
          </v-label>

          <v-label v-if="languages.length" :name="$t('components.ideaCard.languages')" class="v-idea__labels">
            <div class="v-idea__labels-list">
              <v-chip
                v-for="(lang, key) in languages"
                :key="lang + key + id"
                :text="t('languages.'+lang.name,lang.name)"
                type="auto"
                class="v-idea__label"
              />
            </div>
          </v-label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'v-idea',

  props: {
    publishDate: String,
    linked: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      required: true
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
@layer components {
  .v-idea {
    @apply relative p-4 transition-all transition-shadow;

    &__link {
      @apply text-primary inline-block mb-1 text-xl font-normal transition-colors;
    }

    &__publish-date {
      @apply text-xs text-gray-400 mb-3;
    }

      &__image {
      @apply mr-4;
      @apply rounded-full #{!important};
    }

    &__description {
      @apply font-normal w-full mb-3;
    }

    &__labels {
      @apply pr-6 my-2 mr-6 w-1/3 border-r border-muted;
      &:last-of-type {
        @apply border-0 #{!important};
      }
    }

    &__labels-list {
      @apply flex flex-wrap;
    }

    &__label {
      @apply mr-2 mb-2;
    }
  }
}
</style>
