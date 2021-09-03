<template>
  <div
    class="inline-block w-full"
    :class="{ 'relative z-50': isFocused }"
    ref="containerRef"
  >
    <label class="flex min-w-[200px] relative group z-10 cursor-text">
      <span
        v-if="placeholder"
        ref="placeholderRef"
        class="
          whitespace-nowrap
          absolute
          flex
          items-center
          transform
          text-dark-50
          dark:text-light-300
        "
        :class="[
          !shadow && 'pl-4',
          isMounted && 'transition-all',
          isFocused || modelValue
            ? 'top-0 translate-y-0 opacity-50 text-xs'
            : 'top-6 -translate-y-1/2 opacity-30 dark:opacity-20',
        ]"
        v-text="placeholder"
      />
      <component
        :is="type === 'textarea' ? 'textarea' : 'input'"
        :type="type === 'textarea' && type"
        :name="name"
        :value="modelValue"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        v-focusable.indexOnly
        autocomplete="off"
        class="bg-[transparent] w-full py-3 resize-none ring-opacity-50"
        :class="[
          shadow
            ? 'border-none ring-none'
            : 'px-4 rounded-xl bg-gray-50 border dark:bg-dark-800 dark:bg-opacity-70 hover:bg-gray-100 transition-all',

          isFocused && !shadow
            ? 'border-primary-400 ring ring-primary-300 dark:ring-primary-900'
            : 'border-gray-300 dark:border-dark-600',
          !!errors.length &&
            '!border-danger-500 !ring-danger-200 dark:!ring-danger-900',
        ]"
      />
    </label>
    <AtomicTextError
      v-show="isErrorVisible"
      ref="errorTextRef"
      :text="errorMessage"
    />
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
  onMounted,
  useAttrs,
  useSlots,
} from 'vue'
import { useField } from 'vee-validate'
import { useMotion } from '@vueuse/motion'
import { not, useElementBounding, whenever } from '@vueuse/core'

export default defineComponent({
  name: 'AtomicInput',
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: [String, Number], default: '' },
    name: { type: String, required: true },
    type: { type: String, default: 'text' },
    rules: { type: [String, Array, Object, Function], default: null },
    placeholder: { type: String, default: '' },
    shadow: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const isMounted = ref(false)
    const errorMessage = ref(null)
    const isErrorVisible = ref(false)
    const isFocused = ref(false)
    const errorTextRef = ref(null)
    const containerRef = ref(null)
    const placeholderRef = ref(null)

    const attrs = useAttrs()
    const {
      handleChange,
      handleBlur,
      errors,
      errorMessage: err,
    } = useField(props.name, props.rules, {
      initialValue: props.modelValue,
    })
    const motion = useMotion(errorTextRef, {
      initial: {
        marginTop: -24,
        opacity: 0,
        transition: { duration: 500 },
      },
      show: {
        marginTop: 0,
        opacity: 1,
        transition: { duration: 100 },
      },
    })

    const onFocus = () => (isFocused.value = true)
    const onBlur = (e) => (isFocused.value = false) || handleBlur(e)
    const onInput = (e) =>
      emit('update:modelValue', e.target.value) || handleChange(e)

    whenever(err, async () => {
      isErrorVisible.value = true
      errorMessage.value = err.value
      await motion.apply('show')
    })
    whenever(not(err), async () => {
      // We're meant to be together
      await motion.apply('initial')
      isErrorVisible.value = false
      errorMessage.value = null
    })
    onMounted(() => setTimeout(() => (isMounted.value = true)))

    return {
      attrs,
      errors,
      isFocused,
      errorMessage,
      errorTextRef,
      isErrorVisible,
      isMounted,
      containerRef,
      placeholderRef,
      onBlur,
      onFocus,
      onInput,
    }
  },
})
</script>
