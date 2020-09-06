<template>
  <button
    v-on="$listeners"
    :class="[
      'btn',
      'btn--type-' + type,
      small && 'btn--size-small',
      rounded && 'btn--rounded',
      disabled && 'btn--disabled',
    ]"
    :disabled="disabled"
  >
    <div
      v-if="$slots.default"
      class="btn__content"
    >
      <slot />
    </div>
    <v-icon
      v-if="icon"
      :icon="icon"
      :class="[
        'btn__icon',
        !$slots.default && 'btn__icon--nomargin'
      ]"
    />
    <!-- <v-loading
      v-if="icon && (loading || internalLoading)"
      :class="[
        'btn__icon',
        !$slots.default && 'btn__icon--nomargin'
      ]"
    /> -->
  </button>
</template>

<script>
export default {
  name: 'v-button',

  props: {
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

@mixin button-type () {
  @each $name, $color in map-get($default-colors, 'scheme' ) {
    &--type-#{$name} {
      color: #fff;
      background-color: var(--color-#{$name});
      box-shadow: 0px 2px 4px var(--color-#{$name}-fade);
      border: 1px solid var(--color-#{$name});

      &:hover {
        background-color: var(--color-#{$name}-tint);
        border: 1px solid var(--color-#{$name}-tint);
      }

      &:active {
        background-color: var(--color-#{$name}-darken);
        border: 1px solid var(--color-#{$name}-darken);
        box-shadow: none;
      }
    }

    &--type-flat-#{$name} {
      color: var(--color-#{$name});
      transition: background-color .3s var(--base-transition);
      &:hover {
        background-color: var(--color-#{$name}-fade);
      }
    }
  }
}

.btn {
  background: none;
  font-family: inherit;
  font-size: .9rem;
  padding: .3rem 1rem;
  padding-top: calc(.3rem - 1px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 4px;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  font-weight: 400;
  line-height: 1.5;
  transition-property: background-color, box-shadow;
  transition: .3s var(--base-transition);

  &--disabled {
    opacity: .5;
  }

  @include button-type();

  &--type-muted {
    background-color: var(--color-muted);
    color: #000;
  }

  &--type-dark {
    background-color: #000;
    color: #fff;
  }

  &--rounded {
    border-radius: 50px;
  }

  &__icon {
    margin-left: 1rem;
    width: 1em !important;
    height: 1em !important;
    &--nomargin {
      margin: 0;
    }
  }
}
</style>
