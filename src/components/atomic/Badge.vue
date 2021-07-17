<template>
  <div class="relative">
    <slot />

    <div
      v-if="value"
      class="
        px-1
        absolute
        -top-3
        -right-3
        h-[20px]
        min-w-[20px]
        flex
        items-center
        justify-center
        text-center text-xs text-white
        bg-success-500
        rounded-xl
        shadow
      "
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
import { useAttrs } from 'vue'

export default {
  name: 'AtomicBadge',
  props: {
    value: { type: [String, Number], default: null },
  },
  setup() {
    const attrs = useAttrs()

    return {
      attrs,
    }
  },
}
</script>
