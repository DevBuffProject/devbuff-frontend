<template>
  <component
    :is="btnProps.is"
    v-bind="btnProps"
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
  <div class="btn__overlay" @click="click"></div>
    <div
      v-if="$slots.default"
      class="btn__content"
    >
      <slot />
    </div>
    <v-icon
      v-if="icon && !(loading || internalLoading)"
      :icon="icon"
      :class="[
        'btn__icon',
        !$slots.default && 'btn__icon--nomargin'
      ]"
    />
    <v-loading
      v-if="icon && (loading || internalLoading)"
      :class="[
        'btn__icon',
        !$slots.default && 'btn__icon--nomargin'
      ]"
    />
  </component>
</template>

<script>
const TYPES = require('@/kernel/UI/colors.json')

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
    to: {
      type: [ String, Object ],
      default: null
    },
    href: {
      type: String,
      default: null
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      internalLoading: false
    }
  },
  computed: {
    btnProps() {
      const props = {
        is: ((Object.keys(this.$listeners).length) && 'button')
          || (this.to && 'NuxtLink')
          || (this.href && 'a')
          || 'span',
      };
      if (props.is === 'NuxtLink') {
        props.to = this.to;
      } else if (props.is === 'a') {
        props.href = this.href;
      }
      return props;
    }
  },
  methods: {
    click(event) {
      if (this.internalLoading || this.disabled && this.loading) {
        event.preventDefault()
        event.stopPropagation()

        return false
      }

      if (this.to && this.icon) {
        this.internalLoading = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  background: none;
  font-family: inherit;
  font-size: .9rem;
  padding: .35rem 1.5rem;
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
  text-shadow: 0 1px 0 rgba(0,0,0,.07);
  transition-property: background-color, box-shadow;
  transition: .3s var(--base-transition);

  &--disabled {
    opacity: .5;
  }

  &--type-primary {
    background-color: var(--color-primary);
    box-shadow: 0 2px 4px var(--color-primary-lighten);
    color: #fff;
    &:active {
      background-color: var(--color-primary-darken);
      box-shadow: none;
    }
  }
  &--type-muted {
    background-color: var(--color-muted);
    color: #000;
  }
  &--type-dark {
    background-color: #000;
    color: #fff;
  }
  &--type-flat {
    color: var(--color-text);
    transition: background-color .3s var(--base-transition);
    &:hover {
      background-color: var(--color-muted);
    }
  }

  &--size-small {
    font-size: .8rem;
    padding: .2rem 1rem;
  }

  &--rounded {
    border-radius: 50px;
  }

  &__overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  &__icon {
    margin-left: 1rem;
    width: 1em !important;
    height: 1em !important;
    &--nomargin {
      margin: 0;
    }
    &--spin {
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  0% { transform: rotateZ(0deg) }
  100% { transform: rotateZ(360deg) }
}
</style>
