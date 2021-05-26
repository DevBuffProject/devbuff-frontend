<template>
  <template v-if="!slots.default">
    <div v-if="!slots.default">
      <span> {{ label }} </span>
    </div>
  </template>
  <template v-else>
    <div @click="onChange" @keypress.enter="onChange">
      <slot v-bind="{ isChecked, isIntermedia }" />
    </div>
  </template>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { isBoolean } from '@vueuse/core'

export default defineComponent({
  name: 'AtomicFormCheckbox',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [Boolean, Array, String],
      default: false,
    },
    isIntermedia: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    value: {
      type: [Boolean, String, Number, Array],
      default: null,
    },
  },
  setup(props, ctx) {
    const { attrs, slots } = ctx
    const isChecked = computed(() =>
      Array.isArray(props.modelValue)
        ? props.modelValue.includes(props.value)
        : props.modelValue === true,
    )
    const onChange = () => {
      let newModelValue
      if (Array.isArray(props.modelValue)) {
        newModelValue = [...props.modelValue]
        if (isChecked.value)
          newModelValue.splice(props.modelValue.indexOf(props.value), 1)
        else newModelValue.push(props.value)
      }
      if (isBoolean(props.modelValue)) newModelValue = !props.modelValue

      ctx.emit('update:modelValue', newModelValue)
    }

    return {
      onChange,
      isChecked,
      attrs,
      slots,
    }
  },
})
</script>
