<template>
  <svg aria-hidden="true" class="w-5 h-5">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Svg',
  props: {
    name: { type: String, required: true },
  },
  setup(props) {
    const symbolId = computed(() => `#icon-${props.name}`)
    return { symbolId }
  },
})
</script>
