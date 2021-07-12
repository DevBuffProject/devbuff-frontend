<template>
  <div><AtomicFormFile v-model="files" /></div>
</template>

<script setup>
import { ref } from 'vue'
const files = ref([])
</script>
