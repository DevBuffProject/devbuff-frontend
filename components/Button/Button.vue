<template>
  <button
    v-on="$listeners"
    :class="[
      'v-btn',
      (flat && type) && 'v-btn--type-flat-' + type,
      !flat && 'v-btn--type-' + type,
      flat && 'v-btn--type-flat',
      rounded && 'v-btn--rounded',
      disabled && 'v-btn--disabled',
      loading && 'v-btn--loading',
      small && 'v-btn--size-small'
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
      font-weight: 700;
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
        transition: opacity .3s var(--base-transition);
      }

      &:hover {
        box-shadow: 0px 4px 10px -5px var(--color-#{$name}-tint);
      }

      &:active,
      &:focus,
      & /deep/ *:focus {
        box-shadow: 0px 0px 0px 4px var(--color-#{$name}-fade);
      }

      &:active::before {
        opacity: 0
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
  line-height: 1.5;
  overflow: hidden;
  outline: none;
  transition:
    box-shadow .3s var(--base-transition),
    background-color .5s var(--base-transition);

  @include button-type();

  &--size-small {
    font-size: .8rem;
    padding: .1rem .8rem;
  }

  &--disabled {
    opacity: .5;
  }

  &--type-muted {
    background-color: var(--color-muted);
    font-weight: 600;
    color: #000;
  }

  &--type-dark {
    background-color: #000;
    font-weight: 700;
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

@keyframes progress {
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: 2.5em 0px;
  }
}
</style>
