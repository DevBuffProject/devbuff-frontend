<template>
  <div
    :class="[
      'input',
      (autocomplete && focused) && 'input--island',
      (autocomplete && focused && icon) && 'input--island-icon'
    ]"
    @click="focus"
  >
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      ref="field"
      :class="[
        'input__field',
        /* focused && 'input__field--focused', */
        muted && 'input__field--muted',
        icon && 'input__field--icon',
        (type === 'textarea') && 'input__field--type-textarea'
      ]"
      :type="type"
      v-model="model"
      v-on:input="$emit('input', $event.target.value)"
      @focus="focus"
      @blur="blur"
    />
    <div
      :class="[
        'input__placeholder',
        (placeholderCentered && !focused && !model) && 'input__placeholder--centered'
      ]"

    >
      <v-icon v-if="icon" :icon="icon" class="input__placeholder-icon" />
      <span
        v-if="placeholder && !model"
        :class="[
          'input__placeholder-text',
          focused && 'muted'
        ]"
      >
        {{ placeholder }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-input',

  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: null
    },
    placeholderCentered: {
      type: Boolean,
      default: null
    },
    value: {
      type: [ String, Number ],
      default: null
    },
    muted: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [ String, Array ],
      default: null
    },
    autocomplete: {
      type: [ String, Object ],
      default: null,
      validate: (v) => {
        if (typeof v === 'object') {
          return v.data || v.url
        } else if (typeof v === 'string') return Boolean(v)
      }
    }
  },
  data() {
    return {
      focused: false,
      model: null
    }
  },
  methods: {
    focus() {
      this.focused = true
      this.$refs.field.focus()
    },
    blur() {
      this.focused = false
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  margin: -10px;
  padding: 10px;
  width: fit-content;

  &__placeholder {
    position: absolute;
    top: 0;
    left: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    transition: .2s var(--base-transition);
    transition-property: transform, left;
    &--centered {
      left: 50%;
      transform: translateX(-50%);
    }

    &-icon {
      padding: 0 10px;
    }
    &-text {
      transition: opacity .3s var(--base-transition);
    }
  }

  &__field {
    outline: none;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
    padding: .3rem 1rem;
    width: 100%;
    resize: none;
    box-sizing: border-box;
    border: 1px solid var(--color-muted);
    box-shadow: 0 1px 1px rgba(211,218,230,.3);
    transition: border-color .3s var(--base-transition);
    &--icon {
      padding-left: 2rem;
    }
    &--muted {
      background-color: var(--color-muted);
      border: 0;
      box-shadow: none;
    }
    &:focus {
      border-color: var(--color-primary) !important
    }
    &--type-textarea {
      padding: 1rem;
    }
  }
}
</style>
