<template>
  <button
    :class="[
      'px-6 overflow-hidden rounded outline-none relative',
      'transform transition-all active:scale-95 border-2',
      isSmall ? 'py-0.5 text-sm' : 'py-1',
      {
        'bg-primary border-primary text-white': type === 'primary',
        'bg-success border-success text-white': type === 'success',
        'bg-warning border-warning text-white': type === 'warning',
        'bg-danger border-danger text-white': type === 'danger',
      },
    ]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div
      v-if="$slots.default"
      :class="['font-normal', loading && 'invisible relative']"
    >
      <slot />
      <v-icon
        v-if="icon"
        :icon="icon"
        class="ml-4"
        :class="{ 'm-0': !$slots.default }"
      />
    </div>
    <div
      v-if="loading"
      class="absolute w-full h-full top-0 left-0 flex items-center justify-center"
    >
      <atomic-loading
        :class="[isMuted ? 'text-black dark:text-white' : 'text-white']"
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
