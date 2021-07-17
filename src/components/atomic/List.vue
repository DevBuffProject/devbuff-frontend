<template>
  <ul
    class="
      p-0
      m-0
      list-none
      divide-y divide-gray-200 divide-opacity-80
      dark:divide-white dark:divide-opacity-05
    "
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
