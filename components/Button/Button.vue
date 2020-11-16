<template>
  <button
    v-on="$listeners"
    :class="[
      'btn',
      'btn--type-' + type,
      rounded && 'btn--rounded',
      disabled && 'btn--disabled',
    ]"
    :disabled="disabled"
  >
    <div
      v-if="$slots.default"
      :class="['btn__content', loading && 'btn__content-hidden']"
    >
      <slot />
    </div>
    <span v-if="loading" class="btn__loading">
      <v-loading />
    </span>
    <v-icon
      v-if="icon"
      :icon="icon"
      :class="[
        'btn__icon',
        !$slots.default && 'btn__icon--nomargin'
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
      border: 1px solid transparent;
      background-clip: border-box !important;
      background-origin: border-box !important;
      background-color: var(--color-#{$name});
      background-image: linear-gradient(135deg, var(--color-#{$name}-tint), var(--color-#{$name}));
      box-shadow: 0px 2px 4px var(--color-#{$name}-fade);

      &:hover {
        background-color: var(--color-#{$name}-tint);
      }

      &:active {
        background-color: var(--color-#{$name}-darken);
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
  transition-property: background-color, box-shadow;
  transition: .3s var(--base-transition);

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

  &__content-hidden {
    opacity: 0;
  }

  &__loading {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) !important;
  }

  &__icon {
    margin-left: 8px;
    width: 1em !important;
    height: 1em !important;
    &--nomargin {
      margin: 0;
    }
  }
}
</style>
