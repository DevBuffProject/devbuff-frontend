<template>
  <div class="flex items-center">
    <template v-for="(item, index) in items" :key="item.title">
      <component
        :is="item.to && index < items.length - 1 ? 'router-link' : 'span'"
        :class="[index < items.length - 1 && 'text-primary', 'focusable']"
        v-bind="item"
        v-focusable
      >
        {{ item.title }}
      </component>
      <ChevronRightIcon
        v-if="index < items.length - 1"
        class="mx-0.5 -my-2 text-gray-300 dark:text-blueGray-500"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

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
