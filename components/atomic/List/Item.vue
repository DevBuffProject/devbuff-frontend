<template>
  <li class="px-4 py-2" v-bind="$attrs" v-on="$listeners">
    <slot />
  </li>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AtomicListItem',
})
</script>
