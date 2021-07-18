<template>
  <div
    class="
      hover:bg-gray-50
      dark:hover:bg-dark-900
      text-sm
      flex
      items-start
      px-4
      py-2
      min-h-[50px]
      text-sm
    "
    v-bind="attrs"
  >
    <div
      class="bg-opacity-[.15] rounded-full p-1 text-xs"
      :class="{
        'text-primary-500 bg-primary-500': type === 'primary',
        'text-secondary-500 bg-secondary-500': type === 'secondary',
        'text-warning bg-warning': type === 'warning',
        'text-danger-500 bg-danger-500': type === 'danger',
        'text-success-500 bg-success-500': type === 'success',
        'bg-gray-500': type === 'muted',
      }"
    >
      <slot name="icon" />
    </div>

    <div class="ml-2">
      <slot />
      <div class="text-xs opacity-30 mt-1">{{ date }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useAttrs } from 'vue'

export default defineComponent({
  name: 'AtomicCardNotification',
  props: {
    type: {
      type: String,
      default: 'muted',
    },
    date: {
      type: String,
      default: null,
    },
  },
  setup() {
    const attrs = useAttrs()

    return { attrs }
  },
})
</script>
