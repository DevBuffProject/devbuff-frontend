<template>
  <div class="relative">
    <ValidationProvider v-slot="{ errors }" :rules="rules" tag="div">
      <label :class="['block', inlineLabel && 'flex items-center']">
        <div
          v-if="label"
          class="font-medium text-xs mt-2 mb-1 mr-6"
          style="min-width: 70px; max-width: 150px"
        >
          {{ label }}
        </div>
        <div
          :class="[
            'relative w-full inline-flex rounded-md overflow-hidden rounded box-border',
            'items-baseline cursor-pointer transition-all outline-none',
            'border-2 bg-white dark:bg-blueGray-700',
            errors.length && '!border-danger !ring-danger-200 dark:!ring-danger-900',
            isFocused
              ? 'ring ring-primary-200 dark:ring-primary-900 border-primary'
              : 'border-gray-300 dark:border-blueGray-700',
          ]"
          @mousedown="setFocus"
        >
          <textarea
            v-if="type === 'textarea'"
            ref="field"
            :class="[
              'w-full py-2 px-4 bg-transparent outline-none w-full',
              'resize-none min-h-[100px]',
            ]"
            :value="modelValue"
            v-bind="$attrs"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
          />
          <input
            v-else
            ref="field"
            :class="[
              'w-full py-2 px-4 bg-transparent outline-none w-full resize-none',
              type === 'textarea' && 'resize-none min-h-[100px]',
            ]"
            :value="modelValue"
            v-bind="$attrs"
            autocomplete="off"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
          />
        </div>
      </label>
      <div
        v-if="errors.length"
        v-motion="'errorMessage'"
        :initial="{ marginTop: -10, opacity: 0 }"
        :enter="{ marginTop: 0, opacity: 1 }"
        class="flex items-center pt-1 text-xs text-danger"
      >
        <svg-icon name="outline/exclamation-circle" class="mr-2" />
        <span class="mt-px">{{ errors[0] }}</span>
      </div>
    </ValidationProvider>
    <div
      v-if="$slots.dropdown"
      v-show="isDropdownOpen"
      class="absolute w-full z-50"
      @mousedown.stop
    >
      <div
        class="
          mt-2
          flex
          rounded
          border-2 border-primary
          dark:border-blueGray-700
          bg-white
          shadow-xl
        "
      >
        <slot name="dropdown" v-bind="{ setFocus, hideDropdown }" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { localize } from 'vee-validate'

const types = ['date', 'number', 'text', 'textarea']

export default defineComponent({
  name: 'VInput',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validate: (v) => types.includes(v),
    },
    label: {
      type: String,
      default: '',
    },
    inlineLabel: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [String, Array, Function],
      default: null,
    },
  },

  setup(props, { emit }) {
    const { i18n } = useContext()
    const isFocused = ref(false)
    const isDropdownOpen = ref(false)

    const hideDropdown = () => (isDropdownOpen.value = false)
    const setFocus = () => {
      // this.$refs.field.focus()
    }
    const onInput = (e) => emit('update:modelValue', e.target.value)
    const onFocus = (e) => {
      isFocused.value = true
      isDropdownOpen.value = true
      emit('focus')
    }
    const onBlur = () => {
      isFocused.value = false
      isDropdownOpen.value = false
      emit('blur')
    }

    localize(i18n.locale)

    return {
      isFocused,
      isDropdownOpen,
      hideDropdown,
      setFocus,
      onInput,
      onFocus,
      onBlur,
    }
  },
})
</script>
