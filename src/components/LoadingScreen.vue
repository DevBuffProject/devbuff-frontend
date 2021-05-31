<template>
  <AtomicOverlay
    visible
    hide-controls
    transparent
    class="backdrop-filter backdrop-blur-[10px]"
  >
    <img src="/images/icon.png" alt="logo" class="w-[60px]" />
  </AtomicOverlay>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingScreen',
})
</script>
