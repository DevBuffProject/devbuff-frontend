<template>
  <ValidationProvider
    :rules="rules"
    v-slot="{ errors }"
  >
    <label
      :class="[
      'input',
      errors.length && 'input--invalid'
    ]"
      @mousedown="focus"
    >
      <v-icon v-if="icon" :icon="icon" class="input__icon" />
      <textarea
        v-if="textarea"
        ref="field"
        :class="[
        'input__field',
        icon && 'input__field--icon',
      ]"
        :value="model"
        v-bind="$attrs"
        @input="input"
        @focus="focus"
        @blur="blur"
      >
      </textarea>
      <input
        v-else
        ref="field"
        :class="[
        'input__field',
        icon && 'input__field--icon',
      ]"
        :value="model"
        v-bind="$attrs"
        @input="input"
        @focus="focus"
        @blur="blur"
      />
    </label>
    <transition name="fade">
      <div v-if="errors.length" class="input__error">
        <v-icon :icon="['fas', 'exclamation']" class="input__error-icon" />
        <span>{{ errors[0] }}</span>
      </div>
    </transition>
  </ValidationProvider>
</template>

<script>
import { localize } from 'vee-validate'

export default {
  name: 'v-input',

  props: {
    type: {
      type: String,
      default: 'text'
    },
    textarea: {
      type: Boolean,
      default: false
    },
    rules: {
      type: String,
      default: null
    },
    value: {
      type: [ String, Number ],
      default: null
    },
    icon: {
      type: [ String, Array ],
      default: null
    }
  },

  created() {
    localize(this.$i18n.locale)
  },

  data() {
    return {
      focused: false,
      model: this.value,
      inputType: this.type === 'date' && !this.value
        ? 'text'
        : this.type
    }
  },

  methods: {
    focus() {
      this.focused = true
      this.$refs.field.focus()

      if (this.type === 'date') {
        this.inputType = 'date'
        setTimeout(() => this.$refs.field.focus(), 100)
      }
    },
    blur() {
      this.focused = false

      if (this.type === 'date' && !this.model) {
        this.inputType = 'text'
      }
    },
    input(event) {
      const value = event.target.value
      this.model = value

      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  background-color: var(--color-background-contrast);
  position: relative;
  width: fit-content;
  display: inline-flex;
  border: 1px solid var(--color-muted);
  padding: .3rem 1rem;
  border-radius: 4px;
  box-sizing: border-box;
  align-items: baseline;
  cursor: text;
  transition: border-color .3s var(--base-transition);

  &--focused {
    border-color: var(--color-primary) !important
  }

  &--invalid {
    border-color: var(--color-danger);
  }

  &__error {
    display: flex;
    align-items: center;
    margin-top: .25rem;
    font-size: .85rem;
    color: var(--color-danger);
  }

  &__error-icon {
    font-size: .7rem;
    margin-right: .5rem;
    transform: translateY(-1px);
  }

  &__icon {
    transform: translateY(4px);
    display: flex;
    margin-right: 1rem;
    align-items: center;
    color: var(--color-muted);
    width: 1.2rem;
    font-size: 1.2rem;
    transition: .2s var(--base-transition);
    transition-property: transform, left;
  }

  &__field {
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    border: 0;
    outline: 0;
    width: 100%;
    min-width: 0;
    resize: none;
    box-sizing: border-box;
    position: relative;
    &::placeholder {
      position: absolute;
      top: 2px;
      left: 0;
      font-family: inherit;
      font-weight: 200;
      text-transform: lowercase;
      transition: .2s var(--base-transition);
      transition-property: left, opacity;
    }
    &:focus::placeholder {
      opacity: .35;
      left: 5px;
    }
  }
}
</style>
