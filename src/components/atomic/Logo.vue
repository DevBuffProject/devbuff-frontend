<template>
  <div class="w-[110px] flex items-center" itemscope itemtype="https://schema.org/Brand">
    <img itemprop="logo" :src="src" alt="Devbuff logo" class="w-full" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
  },
})
</script>
