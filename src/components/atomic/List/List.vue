<template>
  <ul class="p-0 m-0 list-none divide-y divide-gray-200 dark:divide-dark-800">
    <slot />
  </ul>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AtomicList',
})
</script>
