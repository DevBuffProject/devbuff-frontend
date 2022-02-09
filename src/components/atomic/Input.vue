<template>
  <label @mousedown.prevent="focus" @click="focus" class="mt-1">
    <fieldset
      :class="{
        'border-2 rounded-xl bg-light-200 dark:bg-dark-900 flex relative cursor-text transition-all': true,
        'border-red-500': error,
        'border-light-900 dark:border-dark-200': !isFocused,
        'border-primary-500': isFocused,
      }"
    >
      <legend
        class="transition-all duration-200 ease-out ml-4 box-content"
        :style="{
          width: `${minimizeLabel ? placeholderWidth : 0}px`,
        }"
      />
      <div
        ref="placeholderRef"
        :class="{
          'block absolute transition-all duration-300 leading-0 ml-4': true,
          'top-6 dark:text-dark-50 text-dark-50': !minimizeLabel,
          'top-0 text-sm': minimizeLabel,
          'text-primary-600': isFocused,
          'text-red-500': error,
        }"
      >
        <span class="px-2">{{ label }}</span>
      </div>

      <Field
        ref="inputRef"
        :name="name"
        :rules="rules"
        :as="type === 'textarea' ? 'textarea' : 'input'"
        :type="type !== 'textarea' && type"
        style="color: inherit; font-size: 100%; resize: vertical"
        :class="{
          'rounded-xl py-3 px-6 w-full placeholder bg-[transparent]': true,
          'placeholder-visible': isFocused,
        }"
        :placeholder="placeholder"
        @focus="onFocus"
        @blur="onBlur"
        v-model="VModel"
      />
    </fieldset>

    <div class="h-6 px-4 text-xs">
      <span v-if="error" class="text-red-500" v-text="error" />
    </div>
  </label>
</template>

<style scoped>
.placeholder::placeholder {
  @apply transition-all duration-350 opacity-0 transform translate-y-4;
}

.placeholder-visible::placeholder {
  @apply opacity-100 transform translate-y-0;
}
</style>

<script setup>
import { computed, defineProps, ref, toRefs } from 'vue'
import { useElementSize, useVModel } from '@vueuse/core'
import { Field, useFieldError, useIsFieldValid } from 'vee-validate'

const props = defineProps({
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: null },
  label: { type: String, default: null },
  name: { type: String, default: null },
  rules: { type: [String, Array, Function], default: null },
})
const { modelValue, placeholder, value, type, rules, name } = toRefs(props)

const VModel = useVModel(props, 'modelValue')

const isFocused = ref(false)
const inputRef = ref(null)
const placeholderRef = ref(null)
const { width: placeholderWidth } = useElementSize(placeholderRef)
const minimizeLabel = computed(() => VModel.value.length > 0 || isFocused.value)

const isFieldValid = useIsFieldValid(name)
const error = useFieldError(name)
const focus = () => inputRef.value.$el.focus()
const onFocus = (e) => (isFocused.value = true)
const onBlur = (e) => (isFocused.value = false)
</script>
