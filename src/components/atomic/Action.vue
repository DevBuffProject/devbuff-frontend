<template>
  <button
    class="
      hover:bg-gray-100
      focus:bg-gray-100
      transition-colors
      dark:hover:bg-dark-900
    "
    v-focusable.indexOnly
  >
    <div class="py-2 px-6 flex items-center cursor-pointer transition-colors">
      <div
        class="bg-opacity-[.15]"
        :class="[
          {
            'rounded-md': rounded,
            'text-primary-500': type === 'primary',
            'text-secondary-500': type === 'secondary',
            'text-warning': type === 'warning',
            'text-danger-500 ': type === 'danger',
            'text-success-500': type === 'success',
          },
        ]"
      >
        <slot name="icon" />
      </div>
      <div v-if="slots.default" :class="slots.icon && slots.default && 'ml-1'">
        <slot />
      </div>
    </div>
  </button>
</template>

<script>
import { defineComponent, useAttrs, useSlots } from 'vue'

const types = ['primary', 'secondary', 'warning', 'danger', 'success', 'muted']

export default defineComponent({
  name: 'AtomicAction',
  props: {
    description: { type: String, default: null },
    type: {
      type: String,
      default: 'muted',
      validate: (v) => types.includes(v),
    },
    rounded: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const slots = useSlots()
    const attrs = useAttrs()

    return {
      attrs,
      slots,
    }
  },
})
</script>
