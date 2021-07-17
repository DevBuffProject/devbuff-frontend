<template>
  <button>
    <div
      class="inline-flex items-center cursor-pointer group transition-colors"
      v-focusable.indexOnly
    >
      <div
        :class="[
          {
            'text-primary-500 bg-primary-500': type === 'primary',
            'text-secondary-500 bg-secondary-500': type === 'secondary',
            'text-warning bg-warning': type === 'warning',
            'text-danger-500 bg-danger-500': type === 'danger',
            'text-success-500 bg-success-500': type === 'success',
            'bg-gray-500': type === 'muted',
          },
          `
            bg-opacity-[.15] rounded-full p-1
            group-hover:bg-opacity-20 group-active:bg-opacity-30
            transform group-active:scale-90
          `,
        ]"
      >
        <slot name="icon" />
      </div>
      <div v-if="slots.default" :class="slots.icon && slots.default && 'ml-2'">
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
  },
  setup() {
    const attrs = useAttrs()
    const slots = useSlots()
    return {
      attrs,
      slots,
    }
  },
})
</script>
