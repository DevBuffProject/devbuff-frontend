<template>
  <atomic-card class="relative">
    <template v-if="$slots.user" #bottom>
      <slot name="user" />
    </template>
    <div>
      <!--      <atomic-image-->
      <!--        size="4rem"-->
      <!--        class="mb-2 inline-block"-->
      <!--        :src="'//source.unsplash.com/random?logo&key' + id"-->
      <!--      />-->

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
    </div>

    <div class="mt-2 text-sm text-gray-500 h-10 leading-5">
      {{ description }}
    </div>

    <atomic-label
      v-if="specialists.length"
      :name="$t('components.ideaCard.specialists')"
      class="mt-4"
    >
      <div :class="$style.Labels_list">
        <atomic-chip
          v-for="(spec, index) in specialists"
          :key="'spec' + spec.name + index"
          :text="t(`specializations.${spec.name}.title`, spec.name)"
          :class="$style.Label"
        />
      </div>
    </atomic-label>

    <atomic-label
      v-if="technologies.length"
      :name="$t('components.ideaCard.technologies')"
      class="mt-2"
    >
      <div :class="$style.Labels_list">
        <atomic-chip
          v-for="(tech, index) in new Set(technologies)"
          :key="'tech' + tech + index"
          :text="tech"
          :class="$style.Label"
        />
      </div>
    </atomic-label>

    <atomic-label
      v-if="languages.length"
      :name="$t('components.ideaCard.languages')"
      class="mt-2"
    >
      <div :class="$style.Labels_list">
        <atomic-chip
          v-for="{ name } in languages"
          :key="name"
          :text="t(`languages.${name}`, name)"
          type="auto"
          :class="$style.Label"
        />
      </div>
    </atomic-label>
  </atomic-card>
</template>

<script>
export default {
  name: 'VIdea',
  props: {
    date: {
      type: String,
      default: '',
    },
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
.Labels {
  @apply pr-6 my-2 mr-6;
}

.Labels_list {
  @apply flex flex-wrap;
}

.Label {
  @apply mr-2 mb-2;
}
</style>
