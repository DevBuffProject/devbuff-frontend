<template>
  <li class="py-2" v-bind="$attrs">
    <slot />
  </li>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AtomicListItem',
})
</script>
