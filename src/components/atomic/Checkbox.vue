<template>
  <div class="group cursor-pointer" v-bind="attrs" @click="update">
    <div v-if="!slots.default" class="flex items-center">
      <div
        :class="{
          'w-[20px] h-[20px] transition-all rounded relative border-2': true,
          'bg-primary-500 border-primary-500': isChecked,
          'bg-opacity-50 border-gray-300 group-hover:border-gray-400 group-active:bg-light-700 dark:border-dark-200 dark:group-hover:border-dark-100 dark:group-active:bg-dark-500':
            !isChecked,
        }"
      >
        <div v-show="isChecked" class="w-full h-full">
          <div
            :class="'animation-none w-[6px] h-[16px] border-r-2 border-b-2 border-white transform rotate-45 absolute top-[-2px] left-[5px]'"
          />
        </div>
      </div>
      <span class="mt-px ml-2"> {{ label }} </span>
    </div>
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent, useAttrs, useSlots } from 'vue'

export default defineComponent({
  name: 'AtomicCheckbox',
  emits: ['update:modelValue'],
  props: {
    isIntermedia: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    modelValue: {
      type: [Boolean, String, Number, Array],
      default: false,
    },
    trueValue: {
      type: [Boolean, Number, String],
      default: true,
    },
    falseValue: {
      type: [Boolean, Number, String],
      default: false,
    },
    value: {
      type: [Boolean, String, Number],
      default: null,
    },
  },
  setup(props, { emit }) {
    const attrs = useAttrs()
    const slots = useSlots()
    const isChecked = computed(() =>
      Array.isArray(props.modelValue)
        ? props.modelValue.includes(props.value)
        : props.modelValue === props.trueValue,
    )

    const update = () => {
      if (Array.isArray(props.modelValue) || props.value) {
        const newValue = props.modelValue?.length ? [...props.modelValue] : []
        const includes = props.modelValue?.length
          ? props.modelValue?.includes(props.value)
          : false

        if (!includes) newValue.push(props.value)
        else newValue.splice(newValue.indexOf(props.value), 1)

        emit('update:modelValue', newValue)
      } else {
        emit(
          'update:modelValue',
          props.modelValue === props.trueValue
            ? props.falseValue
            : props.trueValue,
        )
      }
    }

    return {
      isChecked,
      attrs,
      slots,
      update,
    }
  },
})
</script>
