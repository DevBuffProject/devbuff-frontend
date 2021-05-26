<template>
  <button
    :class="[
      'px-6 overflow-hidden rounded relative',
      'transform transition-all border border-opacity-100',
      isSmall ? 'py-0.5 text-sm' : 'py-1.5',
      disabled && [
        '!bg-gray-100 !border-opacity-0 !text-gray-400 focus:!ring-0 !transform-none !transition-none',
        'dark:!bg-blueGray-700 dark:!text-blueGray-900 pointer-events-none',
      ],
      (!type || type === 'muted') && [
        'border-gray-300 dark:border-blueGray-600 hover:border-primary',
        'focus:!ring !ring-primary-300 focus:outline-none focus:border-primary',
        'active:bg-gray-200 dark:active:bg-blueGray-700',
      ],
      type === 'primary' && [
        'focus:ring !ring-primary-300 focus:outline-none focus:border-primary-600',
        'bg-primary border-primary text-white',
        'hover:bg-primary-400 hover:border-primary-400 text-white',
        'active:bg-primary-600 active:border-primary-600',
      ],
      type === 'warning' && [
        'focus:ring ring-warning-300 focus:outline-none focus:border-warning-600',
        'bg-warning border-warning text-white',
        'hover:bg-warning-400 hover:border-warning-400 text-white',
        'active:bg-warning-600 active:border-warning-600',
      ],
      type === 'danger' && [
        'focus:ring ring-danger-300 focus:outline-none focus:border-danger-600',
        'bg-danger border-danger text-white',
        'hover:bg-danger-400 hover:border-danger-400 text-white',
        'active:bg-danger-600 active:border-danger-600',
      ],
      type === 'success' && [
        'focus:ring ring-success-300 focus:outline-none focus:border-success-600',
        'bg-success border-success text-white',
        'hover:bg-success-400 hover:border-success-400 text-white',
        'active:bg-success-600 active:border-success-600',
      ],
    ]"
    v-bind="$attrs"
  >
    <span class="flex items-center">
      <span v-if="slots.icon" class="mr-2">
        <slot name="icon" />
      </span>
      <span
        v-if="slots.default"
        :class="[
          'font-normal whitespace-nowrap',
          loading && 'invisible relative',
        ]"
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
        :class="isMuted ? 'text-black dark:text-white' : 'text-white'"
      />
    </span>
  </button>
</template>

<script>
import { defineComponent, computed } from 'vue'

const types = ['muted', 'primary', 'success', 'warning', 'danger']

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
    icon: {
      type: [Array, String],
      default: null,
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
  setup(props, ctx) {
    const isMuted = computed(() => props.type === 'muted')

    return { isMuted, ...ctx }
  },
})
</script>
