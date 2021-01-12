<template>
  <button
    v-on="$listeners"
    class="v-button"
    :class="classes"
    v-bind="$attrs"
    v-ripple
  >
    <div
      v-if="$slots.default"
      class="v-button__content"
      :class="loading && 'v-button__content--hidden'"
    >
      <slot />
    </div>
    <span v-if="loading" class="v-button__loading">
      <v-loading />
    </span>
    <v-icon
      v-if="icon"
      :icon="icon"
      class="v-button__icon"
      :class="!$slots.default && 'v-button__icon--nomargin'"
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
    return {
      classes: {
        ...TYPES.reduce((acc, type) => {
          acc[`v-button--type_${type}`] = type === this.type
          return acc
        }, {}),
        'v-button--rounded': this.rounded
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@layer components {
  .v-button {
    @apply py-1 px-5 flex items-center overflow-hidden rounded font-medium outline-none transition-colors;

    &--type_contrast {
      @apply text-white bg-black hover:bg-gray-900 dark:text-black dark:bg-white hover:bg-gray-50;
    }

    &--type_muted {
      @apply text-black bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600;
    }

    @each $type in primary success warning danger {
      &--type_#{$type} {
        @apply text-white bg-#{$type};
      }

      &--type_#{$type}-flat {
        @apply text-#{$type} bg-#{$type} bg-opacity-10 hover:bg-opacity-20;
      }
    }

    &--rounded {
      @apply rounded-full #{!important};
    }

    &__icon {
      @apply ml-4;
    }
  }
}
</style>
