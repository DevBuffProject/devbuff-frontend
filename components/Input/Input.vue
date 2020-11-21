<template>
  <label class="input" @mousedown="focus">
    <v-icon v-if="icon" :icon="icon" class="input__icon" />
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      ref="field"
      :class="[
        'input__field',
        icon && 'input__field--icon',
        (type === 'textarea') && 'input__field--type-textarea'
      ]"
      :type="inputType"
      :value="model"
      :placeholder="placeholder"
      @input="input"
      @focus="focus"
      @blur="blur"
    >{{ type === 'textarea' && value }}</component>
  </label>
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
    value: {
      type: [ String, Number ],
      default: null
    },
    icon: {
      type: [ String, Array ],
      default: null
    }
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
  box-shadow: 0 1px 1px rgba(211 ,218, 230, .3);
  padding: .3rem 1rem;
  border-radius: 4px;
  box-sizing: border-box;
  align-items: center;
  cursor: text;
  transition: border-color .3s var(--base-transition);

  &--focused {
    border-color: var(--color-primary) !important
  }

  &__icon {
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
    &::placeholder {
      font-family: inherit;
      font-weight: 200;
      text-transform: lowercase;
      transition: .2s var(--base-transition);
      transition-property: transform, opacity;
    }
    &:focus::placeholder {
      opacity: .35;
      transform: translateX(5px);
    }
  }
}
</style>
