<template>
  <label
    v-focusable.indexOnly
    :class="[
      'inline-block relative px-4 pt-3 pb-2 rounded-md group cursor-text',
      'transition-all border hover:bg-gray-100',
      isFocused
        ? 'border-primary ring ring-primary ring-opacity-30'
        : 'border-gray-300',
    ]"
  >
    <span
      :class="[
        'leading-4 text-gray-600 absolute transition-all',
        isFocused ? 'opacity-30' : 'opacity-70',
      ]"
    >
      search ideas
    </span>
    <input
      type="text"
      :value="modelValue"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      v-bind="attrs"
      class="bg-transparent"
    />
  </label>
</template>

<script>
import { defineComponent, ref, useContext } from 'vue'

export default defineComponent({
  name: 'AtomicInput',
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: String, default: '' },
  },
  setup() {
    const { attrs, emit } = useContext()
    const isFocused = ref(false)

    const onFocus = () => (isFocused.value = true)
    const onBlur = () => (isFocused.value = false)
    const onInput = (e) => emit('update:modelValue', e.target.value)

    return { attrs, isFocused, onFocus, onBlur, onInput }
  },
})
</script>
