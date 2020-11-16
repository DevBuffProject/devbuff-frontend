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
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @focus="focus"
      @blur="blur"
    />
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
