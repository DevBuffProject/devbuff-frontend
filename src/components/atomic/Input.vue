<template>
  <div class="inline-block w-full" ref="containerRef">
    <label
      :class="[
        'block min-w-[200px] relative overflow-hidden group z-10',
        'transition-all rounded-md cursor-text',
        'bg-white dark:bg-blueGray-900 border hover:bg-gray-100',
        isFocused
          ? 'border-primary ring ring-primary-200 dark:ring-primary-900'
          : 'border-gray-300 dark:border-blueGray-600',
        !!errors.length &&
          '!border-danger !ring-danger-200 dark:!ring-danger-900',
      ]"
    >
      <span
        v-if="placeholder"
        ref="placeholderRef"
        :class="[
          'whitespace-nowrap absolute flex items-center transform',
          isMounted && 'transition-all',
          isPlaceholderOverflows
            ? [
                'top-0 !ml-1 opacity-70 translate-y-0 text-xs',
                'cursor-pointer text-black dark:text-blueGray-500',
              ]
            : [
                'top-1/2 -translate-y-1/2 text-gray-600',
                isFocused || modelValue
                  ? 'opacity-30 dark:opacity-50'
                  : 'opacity-70',
              ],
        ]"
        :style="{
          marginLeft: `${textWidth + 10}px`,
          width: `${placeholderWidthFixed}px`,
        }"
      >
        <span :class="['-mt-px ml-3']">
          {{ placeholder }}
        </span>
      </span>
      <component
        :is="type === 'textarea' ? 'textarea' : 'input'"
        v-focusable.indexOnly
        autocomplete="off"
        v-bind="attrs"
        :name="name"
        :value="modelValue"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        class="bg-transparent w-full px-4 py-3"
      />
    </label>
    <AtomicTextError
      v-show="isErrorVisible"
      ref="errorTextRef"
      :text="errorMessage"
    />

    <span
      ref="textRef"
      v-text="modelValue"
      class="absolute top-[-99990px] opacity-0"
    />
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  useContext,
  unref,
  ref,
  onMounted,
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
  },
  setup(props, { emit }) {
    const isMounted = ref(false)
    const errorMessage = ref(null)
    const isErrorVisible = ref(false)
    const isFocused = ref(false)
    const errorTextRef = ref(null)
    const containerRef = ref(null)
    const textRef = ref(null)
    const placeholderRef = ref(null)
    const placeholderWidthFixed = ref()

    const { width: placeholderWidth } = useElementBounding(placeholderRef)
    const { width: containerWidth } = useElementBounding(containerRef)
    const { width: textWidth } = useElementBounding(textRef)
    const { attrs } = useContext()
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

    const isPlaceholderOverflows = computed(
      () =>
        Math.ceil(placeholderWidth.value + textWidth.value + 15) >=
        containerWidth.value,
    )

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
    whenever(isMounted, () => {
      placeholderWidthFixed.value = placeholderWidth.value
    })
    onMounted(() => {
      setTimeout(() => (isMounted.value = true))
    })

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
      textRef,
      textWidth,
      placeholderWidth,
      containerWidth,
      placeholderWidthFixed,
      isPlaceholderOverflows,
      onBlur,
      onFocus,
      onInput,
    }
  },
})
</script>
