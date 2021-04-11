<template>
  <div class="relative">
    <ValidationProvider v-slot="{ errors }" :rules="rules" tag="div">
      <label class="block">
        <div v-if="label" class="font-medium text-xs mt-2 mb-1">
          {{ label }}
        </div>
        <div
          :class="[
            {
              'border-gray-200 dark:border-blueGray-700':
                errors.length === 0 && !isFocused,
              'border-danger': errors.length,
              'border-black': isFocused,
            },
            'relative w-full inline-flex border-2 rounded-md overflow-hidden rounded box-border',
            'items-baseline cursor-pointer bg-white dark:bg-blueGray-700',
          ]"
          @mousedown="setFocus"
        >
          <textarea
            v-if="textarea"
            ref="field"
            class="w-full py-2 px-4 bg-transparent outline-none w-full resize-none"
            :value="value"
            v-bind="$attrs"
            autocomplete="off"
            style="min-height: 100px"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
          />
          <input
            v-else
            ref="field"
            class="w-full py-2 px-4 bg-transparent outline-none w-full resize-none"
            :value="value"
            v-bind="$attrs"
            autocomplete="off"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
          />
        </div>
      </label>
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
    <div
      v-if="$scopedSlots.dropdown"
      v-show="isDropdownOpen"
      class="absolute w-full z-50"
      @mousedown.stop
    >
      <div
        class="mt-2 flex rounded border-2 border-black dark:border-blueGray-700 bg-white shadow-xl"
      >
        <slot name="dropdown" v-bind="{ setFocus, hideDropdown }" />
      </div>
    </div>
  </div>
</template>

<script>
import { localize } from 'vee-validate'

export default {
  name: 'VInput',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [String, Array, Function],
      default: null,
    },
  },

  data: () => ({
    isFocused: false,
    isDropdownOpen: false,
  }),

  created() {
    localize(this.$i18n.locale)
  },

  methods: {
    hideDropdown() {
      this.isDropdownOpen = false
    },
    setFocus() {
      this.$refs.field.focus()
    },
    onInput(event) {
      this.$emit('input', event.target.value)
    },
    onFocus(e) {
      this.isFocused = true
      this.isDropdownOpen = true
      this.$emit('focus')
    },
    onBlur() {
      this.isFocused = false
      this.isDropdownOpen = false
      this.$emit('blur')
    },
  },
}
</script>
