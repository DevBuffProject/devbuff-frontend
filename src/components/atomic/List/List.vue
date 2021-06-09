<template>
  <ul
    class="p-0 m-0 list-none divide-y divide-gray-200 dark:divide-blueGray-800"
    v-bind="$attrs"
  >
    <slot />
  </ul>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AtomicList',
})
</script>
