<template>
  <slot />
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'

onMounted(() => {
  console.log(getCurrentInstance().subTree)
})
</script>
