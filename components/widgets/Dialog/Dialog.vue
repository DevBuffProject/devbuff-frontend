<template>
  <div :class="$style.DialogWindow">
    <div v-if="title" class="mt-2 mb-6 text-xl font-semibold" v-text="title" />
    <slot />
    <div v-if="$slots.controls" class="flex justify-end mt-5 pt-5">
      <slot name="controls" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VDialog',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style module>
.DialogWindow {
  max-width: inherit;
  width: 100%;
}
</style>
