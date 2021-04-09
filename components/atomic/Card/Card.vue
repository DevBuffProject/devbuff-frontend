<template>
  <div
    :class="[
      'bg-white border-2 border-gray-200 dark:border-blueGray-700 dark:bg-blueGray-900',
      'grid p-3 rounded-md border-opacity-0 shadow',
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
