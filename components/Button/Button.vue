<template>
  <button
    v-on="$listeners"
    class="py-1 px-4 self-start overflow-hidden rounded font-medium transition-colors outline-none"
    :class="type === 'muted'
      ? 'text-black bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-blueGray-700 dark:hover:bg-blueGray-600'
      : {
          [`text-white bg-${type}`]: TYPES.includes(type),
          [`text-${type} bg-${type} bg-opacity-10 hover:bg-opacity-20`]: TYPES.includes(type) && type.includes('flat'),
          ['text-white bg-black hover:bg-gray-900 dark:text-black dark:bg-white hover:bg-gray-50']: type === 'contrast',
        }
    "
    v-bind="$attrs"
    v-ripple
  >
    <div v-if="$slots.default" :class="{ invisible: loading }">
      <slot />
      <v-icon
        v-if="icon"
        :icon="icon"
        class="ml-4"
        :class="{ 'm-0': !$slots.default }"
      />
    </div>
    <v-loading
      v-if="loading"
      class="absolute left-1/2 transform -translate-x-1/2"
    />
  </button>
</template>

<script>
const TYPES = [
  'muted', 'contrast',
  'primary', 'primary-flat',
  'success', 'success-flat',
  'warning', 'warning-flat',
  'danger', 'danger-flat'
]

export default {
  name: 'v-button',

  props: {
    type: {
      type: String,
      default: 'primary',
      validate: v => TYPES.includes(v)
    },
    rounded: Boolean,
    icon: [ Array, String ],
    loading: Boolean
  },

  data() {
    return { TYPES }
  }
}
</script>
