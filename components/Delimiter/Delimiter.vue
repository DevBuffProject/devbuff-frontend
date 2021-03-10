<template>
  <div class="flex items-center w-full">
    <i class="border-b border-gray-200 dark:border-blueGray-600 w-full h-px" />
    <span v-if="text" class="mx-4">{{ text }}</span>
    <i class="border-b border-gray-200 dark:border-blueGray-600 w-full h-px" />
  </div>
</template>

<script>
export default {
  name: 'v-delimiter',

  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
