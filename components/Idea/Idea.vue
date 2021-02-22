<template>
  <v-card class="relative p-4">
    <div>
      <div>
        <kinesis-container class="inline-block">
          <kinesis-element :strength="10" type="depth">
            <v-image
              v-if="id !== '775cfa3c-311e-4ce0-977e-1c68001b317b'"
              size="4rem"
              class="mb-2 inline-block shadow-xl"
              :src="'//source.unsplash.com/random?logo&key' + id"
            />
          </kinesis-element>
        </kinesis-container>
      </div>


      <div v-if="!linked" class="text-primary text-xl block font-light"> {{ title }}</div>
      <nuxt-link v-else :to="localePath({ name: 'ideas-id', params: { id } })" class="text-primary text-xl block font-light">
        {{ title }}
      </nuxt-link>

      <div v-if="publishDate" class="mb-3 text-xs text-gray-400 dark:text-blueGray-500">
        {{ publishDate | toLocaleDateTime($i18n.locale) }}
      </div>
    </div>

    <div class="my-4"> {{ description }} </div>

    <v-label v-if="specialists.length" :name="$t('components.ideaCard.specialists')" class="v-idea__labels">
      <div :class="$style.labels_list">
        <v-chip
          v-for="(spec, key) in specialists"
          :key="spec + key + id"
          :text="t('specializations.'+spec.name+'.title',spec.name)"
          :class="$style.label"
        />
      </div>
    </v-label>


    <v-label v-if="technologies.length" :name="$t('components.ideaCard.technologies')" class="v-idea__labels">
      <div :class="$style.labels_list">
        <v-chip
          v-for="(tech, key) in technologies"
          :key="tech + key + id"
          :text="tech"
          :class="$style.label"
        />
      </div>
    </v-label>

    <v-label v-if="languages.length" :name="$t('components.ideaCard.languages')" class="v-idea__labels">
      <div :class="$style.labels_list">
        <v-chip
          v-for="({ name }, key) in languages"
          :key="name + key + id"
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
