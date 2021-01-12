<template>
  <div class="v-idea" @mouseover="hover = true" @mouseout="hover = false">
    <v-image class="v-idea__image" :src="'//source.unsplash.com/random?logo&key' + id" />

    <div>
      <div v-if="!linked"> {{ title }}</div>
      <div v-else class="flex items-center">
        <nuxt-link
          :to="localePath({ name: 'ideas-id', params: { id } })"
          class="v-idea__link"
          :class="{ 'v-idea__link--hover': hover }"
        >
          {{ title }}
        </nuxt-link>
      </div>


      <div class="">
        <div class="v-idea__description"> {{ description }} </div>

        <div v-if="specialists.length || technologies.length || languages.length">
          <v-label v-if="specialists.length" :name="$t('components.ideaCard.specialists')" class="mb-4 mt-4">
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

      </div>
    </div>
  </div>
<!--  <v-card-->
<!--    class="idea"-->
<!--    v-ripple-->
<!--    @mouseover="hover = true"-->
<!--    @mouseout="hover = false"-->
<!--  >-->
<!--    <template #footer>-->
<!--      <div class="flex items-center justify-between w-full">-->
<!--        <div class="idea__date muted">-->
<!--          {{ publishDate | toLocaleDateTime($i18n.locale) }}-->
<!--        </div>-->
<!--        <v-link-->
<!--          v-if="linked"-->
<!--          :to="localePath({ name: 'ideas-id', params: { id } })"-->
<!--          :icon="['fas', 'angle-right']"-->
<!--        >-->
<!--          посмотреть-->
<!--        </v-link>-->
<!--      </div>-->
<!--    </template>-->

<!--    <div class="mb-4">-->
<!--      <div v-if="!linked"> {{ title }}</div>-->
<!--      <div v-else class="flex items-center">-->
<!--        <nuxt-link-->
<!--          :to="localePath({ name: 'ideas-id', params: { id } })"-->
<!--          :class="['idea__link', hover && 'idea__link&#45;&#45;hover']"-->
<!--        >-->
<!--          {{ title }}-->
<!--        </nuxt-link>-->
<!--        <v-icon-->
<!--          :icon="['fas', 'long-arrow-alt-right']"-->
<!--          :class="['ml-2', 'idea__link-icon', hover && 'idea__link-icon&#45;&#45;hover']"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->

<!--    <v-label :name="$t('components.ideaCard.description')" class="w-full">-->
<!--      <div class="idea__description">-->
<!--        {{ description }}-->
<!--      </div>-->
<!--    </v-label>-->

<!--    <div-->
<!--      v-if="specialists.length || technologies.length || languages.length"-->
<!--      class="mt-4"-->
<!--    >-->
<!--      <v-label v-if="specialists.length" :name="$t('components.ideaCard.specialists')">-->
<!--        <span-->
<!--          v-for="(spec, key) in specialists"-->
<!--          :key="spec + key + id"-->
<!--          class="mr-2"-->
<!--        >-->
<!--          <v-chip :text="t('specializations.'+spec.name+'.title',spec.name)"/>-->
<!--        </span>-->
<!--      </v-label>-->

<!--      <v-label v-if="technologies.length" :name="$t('components.ideaCard.technologies')" class="mt-3">-->
<!--        <span-->
<!--          v-for="(tech, key) in technologies"-->
<!--          :key="tech + key + id"-->
<!--          class="mr-2"-->
<!--        >-->
<!--          <v-chip :text="tech"/>-->
<!--        </span>-->
<!--      </v-label>-->

<!--      <v-label v-if="languages.length" :name="$t('components.ideaCard.languages')" class="mt-3">-->
<!--        <span-->
<!--          v-for="(lang, key) in languages"-->
<!--          :key="lang + key + id"-->
<!--          class="mr-2"-->
<!--        >-->
<!--          <v-chip :text="t('languages.'+lang.name,lang.name)" :type="hover ? 'auto' : null"/>-->
<!--        </span>-->
<!--      </v-label>-->

<!--    </div>-->
<!--  </v-card>-->
</template>

<script>
export default {
  name: 'v-idea',

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
@layer components {
  .v-idea {
    @apply p-4 flex transition-all transition-shadow;

    &:hover {
      box-shadow: inset 2px 0 0 theme('colors.primary.DEFAULT');
    }

    &__image {
      @apply mr-4;
      flex-basis: 100px;
    }

    &__description {
      @apply max-w-lg w-full mr-4;
    }
  }
}
</style>
