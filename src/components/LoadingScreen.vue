<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center">
    <div class="w-[80px] h-[80px] p-4 rounded-full">
      <img src="/icon.png" alt="logo" class="w-full" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingScreen',
})
</script>
