<template>
  <button
    :class="[
      'px-5 overflow-hidden rounded-full outline-none relative',
      'transform transition-all active:scale-95 border-2',
      isSmall ? 'py-0.5 text-sm' : 'py-1',
      isMuted
        ? [
            'bg-gray-200 dark:bg-blueGray-600 border-gray-200 dark:border-blueGray-600',
            'bg-opacity-50 dark:bg-opacity-100 border-opacity-10',
          ]
        : [
            `bg-${type} border-${type} text-white`,
            isOutline ? `bg-opacity-0 hover:bg-opacity-10 text-${type}` : '',
          ],
    ]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div
      v-if="$slots.default"
      :class="['font-medium', loading && 'invisible relative']"
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
const TYPES = ['muted', 'contrast', 'primary', 'success', 'warning', 'danger']

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
  data() {
    return { TYPES }
  },
  computed: {
    isMuted() {
      return this.type === 'muted'
    },
  },
}
</script>
