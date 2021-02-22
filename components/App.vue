<template>
  <div class="bg-gray-100 dark:bg-blueGray-900">
    <v-dialog />
    <div> <slot /> </div>
  </div>
</template>

<script>
export default {
  name: 'v-app',
}
</script>
