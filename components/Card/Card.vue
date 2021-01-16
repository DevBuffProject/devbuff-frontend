<template>
  <div
    class="p-3 rounded-xl bg-white border border-gray-200 dark:border-blueGray-700 dark:bg-blueGray-900"
    v-on="$listeners"
  >
    <div v-if="$slots.header" class="v-card__header">
      <slot name="header" />
    </div>
    <div class="v-card__content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="v-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-card',
}
</script>
