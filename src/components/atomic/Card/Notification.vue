<template>
  <div
    class="
      hover:bg-gray-50
      dark:hover:bg-blueGray-900
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
        'text-primary bg-primary': type === 'primary',
        'text-secondary bg-secondary': type === 'secondary',
        'text-warning bg-warning': type === 'warning',
        'text-danger bg-danger': type === 'danger',
        'text-success bg-success': type === 'success',
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
import { defineComponent, useContext } from 'vue'

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
    const { attrs } = useContext()

    return { attrs }
  },
})
</script>
