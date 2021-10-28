<template>
  <AtomicButton @click="visible = true">Big large btn</AtomicButton>

  <AtomicSquircle :width="50" :height="50" :roundness="2"> 0.1 </AtomicSquircle>

  <AtomicDialog v-model:visible="visible">
    <h1>test</h1>
  </AtomicDialog>
</template>
<script setup>
import { ref } from 'vue'

const visible = ref(false)
const m = ref('')
</script>
