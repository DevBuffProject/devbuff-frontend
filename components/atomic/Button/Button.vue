<template>
  <button
    style="box-shadow: 0 2px 0 rgb(0 0 0 / 2%)"
    :class="[
      'px-6 overflow-hidden rounded relative',
      'transform transition-all active:scale-95 border border-opacity-100',
      isSmall ? 'py-0.5 text-sm' : 'py-1.5',
      (!type || type === 'muted') && [
        'border-gray-300 hover:border-primary',
        'focus:!ring !ring-primary-300 focus:outline-none focus:border-primary',
      ],
      type === 'primary' && [
        'focus:!ring !ring-primary-300 focus:outline-none focus:border-primary-600',
        'bg-primary border-primary text-white',
        'hover:bg-primary-400 hover:border-primary-400 text-white',
        'active:bg-primary-600 active:border-primary-600',
      ],
      type === 'warning' && [
        'focus:!ring !ring-warning-300 focus:outline-none focus:border-warning-600',
        'bg-warning border-warning text-white',
        'hover:bg-warning-400 hover:border-warning-400 text-white',
        'active:bg-warning-600 active:border-warning-600',
      ],
      type === 'danger' && [
        'focus:!ring !ring-danger-300 focus:outline-none focus:border-danger-600',
        'bg-danger border-danger text-white',
        'hover:bg-danger-400 hover:border-danger-400 text-white',
        'active:bg-danger-600 active:border-danger-600',
      ],
      type === 'success' && [
        'focus:!ring !ring-success-300 focus:outline-none focus:border-success-600',
        'bg-success border-success text-white',
        'hover:bg-success-400 hover:border-success-400 text-white',
        'active:bg-success-600 active:border-success-600',
      ],
    ]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div
      v-if="$slots.default"
      :class="['font-normal', loading && 'invisible relative']"
    >
      <slot />
    </div>
    <div
      v-if="loading"
      class="absolute w-full h-full top-0 left-0 flex items-center justify-center"
    >
      <atomic-loading
        :class="isMuted ? 'text-black dark:text-white' : 'text-white'"
      />
    </div>
  </button>
</template>

<script>
const TYPES = ['muted', 'primary', 'success', 'warning', 'danger']

export default {
  name: 'VButton',
  props: {
    type: {
      type: String,
      default: 'primary',
      validate: (v) => TYPES.includes(v),
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
  },
  data: () => ({
    TYPES,
  }),
  computed: {
    isMuted() {
      return this.type === 'muted'
    },
  },
}
</script>
