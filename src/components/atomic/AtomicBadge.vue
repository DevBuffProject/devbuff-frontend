<template>
  <div class="relative">
    <slot />

    <div
      class="
        absolute
        -top-3
        -right-3
        h-[20px]
        min-w-[20px]
        flex
        items-center
        justify-center
        px-1
        text-center text-xs text-white
        bg-success
        rounded-xl
      "
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
import { useContext } from 'vue'

export default {
  name: 'AtomicBadge',
  props: {
    value: { type: [String, Number], default: null },
  },
  setup() {
    const { attrs } = useContext()

    return {
      attrs,
    }
  },
}
</script>
