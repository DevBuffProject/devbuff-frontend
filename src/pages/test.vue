<template>
  <AtomicButton @click="m = !m">toggle</AtomicButton>
  <AtomicSnackbar :value="true">
    <AtomicLoadingSpinner class="mr-2" />
    <span class="mt-0.5">Обновление</span>
  </AtomicSnackbar>
  <pre>
    {{ m }}
  </pre>
</template>
<script setup>
import { ref } from 'vue'

const visible = ref(false)
const m = ref(false)
</script>
