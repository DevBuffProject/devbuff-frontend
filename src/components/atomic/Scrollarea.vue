<template>
  <div v-bind="attrs" class="overflow-scroll" ref="container">
    {{ attrs }}
    <slot />
  </div>
</template>

<script>
import { defineComponent, ref, useAttrs } from 'vue'

defineComponent({
  name: 'AtomicScrollarea',
  setup() {
    const attrs = useAttrs()
    const container = ref()
    return { attrs, container }
  },
})
</script>
