<template>
  <div
    :class="[
      $style.DialogWindow,
      'bg-white dark:bg-blueGray-800 rounded my-10 py-6 px-12',
    ]"
  >
    <div v-if="title" class="mt-2 mb-6 text-xl font-semibold" v-text="title" />
    <slot />
    <portal-target
      v-if="portal.length"
      slim
      :name="portal"
      :slot-props="{ isDialog: true }"
    />
    <div v-if="$slots.controls" class="flex justify-end mt-5 pt-5">
      <slot name="controls" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VDialog',
  props: {
    portal: {
      type: String,
      default: '',
    },
    heading: {
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
