<template>
  <button
    v-on="$listeners"
    :class="[
      'v-btn',
      'v-btn--type-' + type,
      rounded && 'v-btn--rounded',
      disabled && 'v-btn--disabled',
    ]"
    :disabled="disabled"
  >
    <div
      v-if="$slots.default"
      :class="['v-btn__content', loading && 'v-btn__content--hidden']"
    >
      <slot />
    </div>
    <span v-if="loading" class="v-btn__loading">
      <v-loading />
    </span>
    <v-icon
      v-if="icon"
      :icon="icon"
      :class="[
        'v-btn__icon',
        !$slots.default && 'v-btn__icon--nomargin'
      ]"
    />
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

      &::before {
        background-image: linear-gradient(135deg, var(--color-#{$name}-tint), var(--color-#{$name}));
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: "";
        opacity: 1;
        transition-property: opacity;
        transition: .15s var(--base-transition);
      }

      &:hover {
        box-shadow: 0px 4px 10px -5px var(--color-#{$name}-tint);
      }

      &:active::before {
        opacity: 0
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

.v-btn {
  position: relative;
  background: none;
  font-family: inherit;
  font-size: .9rem;
  padding: .2rem 1rem;
  text-transform: lowercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 4px;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: 1px;
  overflow: hidden;
  outline: none;
  transition: .3s var(--base-transition);
  transition-property: background-color, box-shadow;

  @include button-type();

  &--disabled {
    opacity: .5;
  }

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

  &__content {
    position: relative;
  }

  &__content--hidden {
    opacity: 0;
  }

  &__loading {
    position: relative;
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
