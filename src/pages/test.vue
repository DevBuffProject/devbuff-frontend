<template>
  <h3 class="!mt-0">Create idea</h3>
  <div
    class="
      -mx-4
      px-4
      bg-light-500
      divide-y divide-light-800
      flex flex-col
      text-xl
      font-thin
    "
  >
    <AtomicInput placeholder="заголовок идеи" shadow />
    <AtomicInput placeholder="краткое описание идеи, проекта" shadow />
    <WidgetEditor v-model="m" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const visible = ref(true)
const m = ref('')
</script>
