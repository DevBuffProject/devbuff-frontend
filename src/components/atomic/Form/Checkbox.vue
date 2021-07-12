<template>
  <div class="group" v-bind="attrs" @click="update">
    <div v-if="!slots.default">
      <input type="checkbox" :checked="isChecked" />
      <span> {{ label }} </span>
    </div>
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent, useAttrs, useSlots } from 'vue'

export default defineComponent({
  name: 'AtomicCheckbox',
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
