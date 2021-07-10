<template>
  <button>
    <div
      class="inline-flex items-center cursor-pointer group transition-colors"
      v-focusable.indexOnly
    >
      <div
        :class="[
          {
            'text-primary bg-primary': type === 'primary',
            'text-secondary bg-secondary': type === 'secondary',
            'text-warning bg-warning': type === 'warning',
            'text-danger bg-danger': type === 'danger',
            'text-success bg-success': type === 'success',
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
      <div
        v-if="slots.default"
        :class="slots.icon && slots.default && 'ml-2'"
      >
        <slot />
      </div>
    </div>
  </button>
</template>

<script>
import { defineComponent, useContext } from 'vue'

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
    const { attrs, slots } = useContext()
    return {
      attrs,
      slots,
    }
  },
})
</script>
