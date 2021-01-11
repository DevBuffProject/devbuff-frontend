<template>
  <button
    v-on="$listeners"
    class="v-button"
    :class="[
      (flat && type) && 'v-button--type-flat-' + type,
      flat ? 'v-button--type-flat' : 'v-button--type-' + type,
      rounded && 'v-button--rounded',
      disabled && 'v-button--disabled',
      loading && 'v-button--loading',
      small && 'v-button--size-small'
    ]"
    :disabled="disabled"
    v-ripple="'var(--ripple-bg-color)'"
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
export default {
  name: 'v-button',

  props: {
    flat: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: [ Array, String ],
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';

.v-button {
  background-color: var(--bg-color);
  color: var(--text-color);
  position: relative;
  font-family: var(--font-family);
  font-size: 1rem;
  padding: .2rem 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  line-height: 1.5;
  overflow: hidden;
  outline: none;
  transition: background-color .5s var(--base-transition);

  &:hover {
    background-color: var(--bg-color-hover);
  }

  @each $color-name, $color in $brand-colors {
    &--type-#{$color-name} {
      --bg-color: var(--color-#{$color-name});
      --bg-color-hover: var(--color-#{$color-name}-lighten-10);
      --ripple-bg-color: rgba(255, 255, 255, .4);
      --text-color: #FFF;
    }
  }

  &--type-muted {
    --bg-color: var(--color-muted);
    --bg-color-hover: var(--color-muted-darken);
    --ripple-bg-color: rgba(0, 0, 0, .1);
    --text-color: #000;

    font-weight: 400;
  }

  &--type-dark {
    background-color: #000;
    font-weight: 500;
    color: #fff;
  }

  &--size-small {
    font-size: .8rem;
    padding: .2rem .8rem;
  }

  &--disabled {
    opacity: .5;
  }

  &--rounded {
    border-radius: 50px;
  }

  &__content {
    position: relative;
    text-decoration: none;
    color: inherit;
  }

  &__content--hidden {
    opacity: 0;
  }

  &__loading {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) !important;
  }

  &__icon {
    position: relative;
    margin-left: 8px;
    width: 1em !important;
    height: 1em !important;
    &--nomargin {
      margin: 0;
    }
  }
}
</style>
