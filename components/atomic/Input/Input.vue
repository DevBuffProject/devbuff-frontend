<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" tag="div">
    <v-label :name="label">
      <div
        :class="[
          {
            'border-gray-200 dark:border-blueGray-700':
              errors.length === 0 && !focused,
            'border-danger': errors.length,
            'border-primary': focused,
          },
          'relative w-full inline-flex border rounded-md overflow-hidden rounded box-border',
          'items-baseline cursor-pointer transition-colors bg-white dark:bg-black',
        ]"
        @mousedown="focus"
      >
        <v-icon v-if="icon" :icon="icon" class="ml-4 mt-1" />
        <textarea
          v-if="textarea"
          ref="field"
          :class="$style.input"
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
          :class="$style.input"
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
      <div
        v-if="errors.length"
        class="flex items-baseline mt-3 text-sm text-danger"
      >
        <v-icon :icon="['fas', 'exclamation']" class="mr-2" />
        <span class="mt-px">{{ errors[0] }}</span>
      </div>
    </transition>
  </ValidationProvider>
</template>

<script>
import { localize } from 'vee-validate'

export default {
  name: 'VInput',

  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    textarea: Boolean,
    rules: {
      type: [String, Array, Function],
      default: null,
    },
    value: {
      type: [String, Number],
      default: null,
    },
    icon: {
      type: [String, Array],
      default: null,
    },
  },

  data: () => ({
    focused: false,
  }),

  created() {
    localize(this.$i18n.locale)
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
    },
  },
}
</script>

<style lang="scss" module>
.input {
  @apply w-full py-2 px-4 bg-transparent outline-none w-full resize-none;
}
</style>
