<template>
  <ValidationProvider
    :rules="rules"
    v-slot="{ errors }"
    tag="div"
  >
    <v-label :name="label">
      <div
        class="v-input"
        :class="{
          'v-input--state_invalid': errors.length,
          'v-input--state_focus': focused
        }"
        @mousedown="focus"
      >
        <v-icon v-if="icon" :icon="icon" class="v-input__icon" />
        <textarea
          v-if="textarea"
          ref="field"
          class="v-input__field"
          :class="icon && 'input__field--icon'"
          :value="value"
          v-bind="$attrs"
          autocomplete="off"
          @input="input"
          @focus="focus"
          @blur="blur"
        />
        <input
          v-else
          ref="field"
          class="v-input__field"
          :class="icon && 'input__field--icon'"
          :value="value"
          v-bind="$attrs"
          autocomplete="off"
          @input="input"
          @focus="focus"
          @blur="blur"
        />
      </div>
    </v-label>

    <transition name="fade">
      <div v-if="errors.length" class="v-input__error">
        <v-icon :icon="['fas', 'exclamation']" class="v-input__error-icon" />
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
    label: String,
    textarea: Boolean,
    rules: [ String, Array, Function ],
    value: [ String, Number ],
    icon:  [ String, Array ],
  },

  created() {
    localize(this.$i18n.locale)
  },

  data: () => ({
    focused: false,
  }),

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
@layer components {
  .v-input {
    @apply relative w-full inline-flex border rounded overflow-hidden;

    //theming
    @apply border-muted bg-white;
    //padding: .5rem 1rem;
    border-radius: 8px;
    box-sizing: border-box;
    align-items: baseline;
    cursor: text;
    transition: border-color .3s var(--base-transition);

    &--state_focus {
      @apply border-primary;
    }

    &--state_invalid {
      @apply border-danger;
    }

    &__field {
      @apply py-2 px-4;
    }

    &__error {
      @apply flex items-center mt-1 text-sm text-danger;
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
      @apply bg-white outline-none w-full resize-none;
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
}
</style>
