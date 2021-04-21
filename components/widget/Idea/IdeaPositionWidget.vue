<template>
  <div>
    <div class="flex justify-between items-center w-full">
      <h2 class="text-primary">
        {{ name }}
      </h2>
      <atomic-chip type="muted" :text="positionsCount" />
    </div>

    <atomic-label
      v-if="languages.length"
      :name="$t('page.ideas.view.team.languages')"
      class="mb-3 mt-4"
    >
      <atomic-chip
        v-for="language in languages"
        :key="language.name"
        :text="language.name"
        type="auto"
        class="mr-2"
      />
    </atomic-label>

    <atomic-label
      v-if="technologies.length"
      :name="$t('page.ideas.view.team.technologies')"
    >
      <atomic-chip
        v-for="framework in technologies"
        :key="framework"
        :text="framework"
        type="auto"
        class="mr-2"
      />
    </atomic-label>

    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: 'VIdeaPositionWidget',
  props: {
    name: {
      type: String,
      required: true,
    },
    languages: {
      type: Array,
      required: true,
    },
    technologies: {
      type: Array,
      required: true,
    },
    positionsCount: {
      type: Number,
      required: true,
    },
  },
}
</script>
