<template>
  <div
    :class="[
      'bg-white border border-gray-100 dark:border-blueGray-700 dark:bg-blueGray-900',
      'grid p-3 rounded-xl',
    ]"
    v-on="$listeners"
  >
    <div v-if="$slots.header" class="v-card__header">
      <slot name="header" />
    </div>
    <div class="v-card__content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="mt-4 self-end">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VCard',
}
</script>
