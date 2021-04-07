<template>
  <v-card class="relative p-4">
    <div>
      <v-image
        size="4rem"
        class="mb-2 inline-block"
        :src="'//source.unsplash.com/random?logo&key' + id"
      />

      <div v-if="!linked" class="text-primary text-xl block font-light">
        {{ title }}
      </div>
      <nuxt-link
        v-else
        :to="localePath({ name: 'ideas-id', params: { id } })"
        class="text-base block font-semibold"
      >
        {{ title }}
      </nuxt-link>

      <!--      <div v-if="publishDate" class="mb-3 text-xs text-gray-400 dark:text-blueGray-500">-->
      <!--        {{ publishDate | toLocaleDateTime($i18n.locale) }}-->
      <!--      </div>-->
    </div>

    <div class="mt-2 text-sm text-gray-500 h-10 leading-5">
      {{ description }}
    </div>

    <v-label
      v-if="specialists.length"
      :name="$t('components.ideaCard.specialists')"
      class="mt-4"
    >
      <div :class="$style.labels_list">
        <v-chip
          v-for="spec in specialists"
          :key="spec"
          :text="t(`specializations.${spec.name}.title`, spec.name)"
          :class="$style.label"
        />
      </div>
    </v-label>

    <v-label
      v-if="technologies.length"
      :name="$t('components.ideaCard.technologies')"
      class="mt-2"
    >
      <div :class="$style.labels_list">
        <v-chip
          v-for="tech in technologies"
          :key="tech"
          :text="tech"
          :class="$style.label"
        />
      </div>
    </v-label>

    <v-label
      v-if="languages.length"
      :name="$t('components.ideaCard.languages')"
      class="mt-2"
    >
      <div :class="$style.labels_list">
        <v-chip
          v-for="{ name } in languages"
          :key="name"
          :text="t(`languages.${name}`, name)"
          type="auto"
          :class="$style.label"
        />
      </div>
    </v-label>
  </v-card>
</template>

<script>
export default {
  name: 'VIdea',

  props: {
    publishDate: String,
    linked: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    specialists: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    hover: false,
  }),

  computed: {
    languages() {
      return this.specialists.length
        ? this.specialists.reduce((acc, spec) => {
            spec.languages.forEach((lang) => acc.push(lang))
            return acc
          }, [])
        : []
    },
    technologies() {
      return this.languages.length
        ? this.languages.reduce(
            (acc, lang) => lang.technologies.map((tech) => tech.name),
            []
          )
        : []
    },
  },
  methods: {
    t(str, fallbackStr) {
      return this.$t && this.$te
        ? this.$te(str)
          ? this.$t(str)
          : fallbackStr
        : fallbackStr || str
    },
  },
}
</script>

<style module>
.labels {
  @apply pr-6 my-2 mr-6;
}

.labels_list {
  @apply flex flex-wrap;
}

.label {
  @apply mr-2 mb-2;
}
</style>
