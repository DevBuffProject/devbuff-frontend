<template>
  <div class="flex items-center">
    <template v-for="(item, index) in items">
      <component
        :is="item.to && index < items.length - 1 ? 'nuxt-link' : 'span'"
        :key="index"
        :class="index < items.length - 1 && 'text-primary'"
        v-bind="item"
      >
        {{ item.title }}
      </component>
      <svg-icon
        v-if="index < items.length - 1"
        :key="`chevron-${index}`"
        name="outline/cheveron-right"
        class="mx-0.5 text-gray-300 dark:text-blueGray-500"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AtomicBreadcrumbs',
  props: {
    items: {
      type: Array,
      default: () => [],
      validate: (v) => !!v[0]?.title,
    },
  },
})
</script>
