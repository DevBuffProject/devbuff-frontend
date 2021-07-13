<template>
  <svg :style="{ width: `${size}px`, height: `${size}px` }">
    <circle
      ref="circle"
      :stroke-width="width"
      stroke-linecap="round"
      fill="transparent"
      :r="size / 2 - 10 + width"
      :cx="size / 2"
      :cy="size / 2"
    />
  </svg>
</template>

<script>
import { defineComponent, computed, ref, onMounted, watch } from 'vue'
import { get } from '@vueuse/core'

export default defineComponent({
  name: 'ProgressCircle',
  props: {
    size: {
      type: Number,
      default: 50,
    },
    width: {
      type: Number,
      default: 3,
    },
    percent: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const circle = ref()
    const radius = computed(() => get(circle).r.baseVal.value)
    const circumference = computed(() => get(radius) * 2 * Math.PI)

    const updateProgress = () => {
      if (!(props.percent >= 0 && props.percent < 101)) return
      const offset =
        get(circumference) - (props.percent / 100) * get(circumference)
      get(circle).style.strokeDashoffset = offset
    }

    onMounted(() => {
      get(circle).style.strokeDasharray = `${get(circumference)} ${get(
        circumference,
      )}`
      get(circle).style.strokeDashoffset = `${get(circumference)}`
      updateProgress()
    })

    watch(() => props.percent, updateProgress)

    return { circle }
  },
})
</script>
