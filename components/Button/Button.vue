<template>
  <button
    v-on="$listeners"
    class="v-button"
    :class="[
      (flat && type) && 'v-button--type-flat-' + type,
      !flat && 'v-button--type-' + type,
      flat && 'v-button--type-flat',
      rounded && 'v-button--rounded',
      disabled && 'v-button--disabled',
      loading && 'v-button--loading',
      small && 'v-button--size-small'
    ]"
    :disabled="disabled"
    v-ripple=""
  >
    <div
      v-if="$slots.default"
      :class="['v-button__content', loading && 'v-button__content--hidden']"
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

@mixin button-type () {
  @each $name, $color in map-get($default-colors, 'scheme' ) {
    &--type-#{$name} {
      color: #fff;
      font-weight: 500;
      background-color: var(--color-#{$name});

      &:hover {
        box-shadow: 0px 4px 10px -5px var(--color-#{$name}-tint);
      }

      &:active,
      &:focus,
      & /deep/ *:focus {
        box-shadow: 0px 0px 0px 4px var(--color-#{$name}-fade);
      }
    }

    &--type-flat-#{$name} {
      color: var(--color-#{$name});
      font-weight: 600;
      transition: background-color .5s var(--base-transition);
      &:hover {
        background-color: var(--color-#{$name}-fade);
      }
    }
  }
}

.v-button {
  position: relative;
  background: none;
  font-family: inherit;
  font-size: 1rem;
  padding: .2rem 1rem;
  text-transform: lowercase;
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
  transition:
    box-shadow .3s var(--base-transition),
    background-color .5s var(--base-transition);

  @include button-type();

  &--size-small {
    font-size: .8rem;
    padding: .2rem .8rem;
  }

  &--disabled {
    opacity: .5;
  }

  &--type-muted {
    background-color: var(--color-muted);
    color: var(--color-text);
    font-weight: 400;
  }

  &--type-dark {
    background-color: #000;
    font-weight: 500;
    color: #fff;
  }

  &--rounded {
    border-radius: 50px;
  }

  &--loading {
    background-image: linear-gradient(
      -45deg,

      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%
    );
    background-size: 2.5em 2.5em;
    background-repeat: repeat-x;
    animation: progress 0.7s linear infinite;

    &::before { opacity: 0 }
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

@keyframes progress {
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: 2.5em 0px;
  }
}
</style>
