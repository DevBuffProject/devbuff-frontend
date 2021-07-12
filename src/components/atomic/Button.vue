<template>
  <button
    class="
      px-6
      overflow-hidden
      rounded-md
      relative
      inline-block
      text-center
      transition-all
      focus:(outline-none
      ring ring-opacity-50)
    "
    :class="[
      colorType === 'muted' && [
        `
          bg-gray-500 hover:bg-opacity-20 active:bg-opacity-30
          dark:(bg-blueGray-500 hover:bg-opacity-30 active:bg-opacity-20)
        `,
        isDepressed
          ? 'bg-opacity-0 dark:bg-opacity-0'
          : 'bg-opacity-10 dark:bg-opacity-40',
      ],
      {
        'bg-primary-500 ring-primary-500 hover:bg-primary-400 active:bg-primary-600':
          colorType === 'primary',
        'bg-success-500 ring-success-500 hover:bg-success-400 active:bg-success-600':
          colorType === 'success',
        'bg-warning ring-warning-500 hover:bg-warning-400 active:bg-warning-600':
          colorType === 'warning',
        'bg-danger-500 ring-danger-500 hover:bg-danger-400 active:bg-danger-600':
          colorType === 'danger',
      },
      isSmall ? 'py-1' : 'py-1.5',
    ]"
    v-bind="attrs"
  >
    <span
      :class="[
        'flex items-center justify-center font-medium',
        isDepressed && [
          colorType === 'primary' && 'text-primary-500',
          colorType === 'success' && 'text-success-500',
          colorType === 'warning' && 'text-warning',
          colorType === 'danger' && 'text-danger-500',
        ],
        type === 'muted' ? 'dark:text-white' : 'text-white',
        isSmall && 'text-sm',
      ]"
    >
      <span v-if="slots.icon" class="mr-2">
        <slot name="icon" />
      </span>
      <span
        v-if="slots.default"
        :class="['whitespace-nowrap', loading && 'invisible relative']"
      >
        <slot />
      </span>
    </span>
    <span
      v-if="loading"
      class="
        absolute
        w-full
        h-full
        top-0
        left-0
        flex
        items-center
        justify-center
      "
    >
      <atomic-loading-spinner
        :class="type === 'muted' ? 'text-black dark:text-white' : 'text-white'"
      />
    </span>
  </button>
</template>

<script>
import { defineComponent, computed, useAttrs, useSlots } from 'vue'

const types = ['muted', 'primary', 'success', 'warning', 'danger']
const defaultType = 'muted'

export default defineComponent({
  name: 'AtomicButton',
  props: {
    type: {
      type: String,
      default: 'primary',
      validate: (v) => types.includes(v),
    },
    isOutline: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    isWide: {
      type: Boolean,
      default: false,
    },
    isDepressed: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const attrs = useAttrs()
    const slots = useSlots()
    const isTypeSupports = computed(() => types.includes(props.type))
    const colorType = computed(() =>
      isTypeSupports.value ? props.type : defaultType,
    )

    return { attrs, slots, isTypeSupports, colorType }
  },
})
</script>
