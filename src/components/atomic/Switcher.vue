<template>
  <div
    :class="[
      'relative inline-flex rounded-full text-black',
      'border border-gray-200 dark:border-blueGray-700',
    ]"
  >
    <div
      ref="elementRefHighlight"
      :class="[
        'absolute z-0 top-0 left-0 h-full rounded-full transition-all shadow',
        'bg-gray-50 dark:bg-blueGray-600 dark:text-white bg-opacity-50 text-black',
        'border border-gray-100 dark:border-blueGray-700',
      ]"
    />
    <div
      v-for="(button, index) in values"
      :key="button.value"
      :ref="setItemRef"
      class="py-2 px-5 cursor-pointer relative z-10 text-xs font-semibold"
      :class="{
        'text-gray-500 dark:text-blueGray-500': activeIndex !== index,
        'text-black dark:text-blueGray-100': activeIndex === index,
      }"
      @click="setValue(index)"
    >
      {{ button.title }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, onBeforeUpdate, onMounted } from 'vue'

export default defineComponent({
  name: 'VSwitcher',
  emits: ['update:value'],

  props: {
    values: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number],
      default: null,
    },
  },

  setup(props, { emit }) {
    const activeIndex = ref(0)
    const elementRefHighlight = ref()
    let elementRefButton = []

    const setValue = (index) => {
      const value = props.values[index] && props.values[index].value
      if (value === props.value) activeIndex.value = index
      emit('update:value', value)
    }

    const computeHighlightStyles = () => {
      const currentActiveIndex = props.value
        ? props.values.findIndex((v) => v.value === props.value)
        : 0

      const button = elementRefButton[currentActiveIndex]

      if (!button) return false

      activeIndex.value = currentActiveIndex

      const width = button.offsetWidth
      const left =
        button.offsetLeft > 0 ? button.offsetLeft - 1 : button.offsetLeft

      elementRefHighlight.value.style.width = `${width + 1}px`
      elementRefHighlight.value.style.transform = `translateX(${left}px)`
    }

    const setItemRef = (el) => {
      if (el) {
        elementRefButton.push(el)
      }
    }
    onBeforeUpdate(() => {
      elementRefButton = []
    })

    onMounted(() => {
      computeHighlightStyles()
      setTimeout(() => (elementRefHighlight.value.style.opacity = 1), 300)
    })

    watch(() => props.value, computeHighlightStyles)

    return {
      activeIndex,
      elementRefHighlight,
      elementRefButton,
      setValue,
      computeHighlightStyles,
      setItemRef,
    }
  },
})
</script>
