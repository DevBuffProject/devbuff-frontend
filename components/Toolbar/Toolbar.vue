<template>
  <div class="v-toolbar">
    <div class="v-toolbar__container">
      <div
        v-show="!hideBacklink"
        v-ripple.dark
        @click="$router.go(-1)" class="v-toolbar__back-link">
        <v-icon :icon="['fas', 'long-arrow-alt-left']" class="v-toolbar__back-link-icon"/>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-toolbar',

  props: {
    hideBacklink: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@layer components {
  .v-toolbar {
    @apply py-3 bg-background-contrast border-b border-muted sticky top-0 z-50;
    @apply dark:border-gray-900;

    @supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, .8);
  }

    &__container {
      @apply flex items-center container mx-auto;
    }

    &__back-link {
      --ripple-color: theme('colors.gray.500');

      width: 30px;
      height: 30px;
      @apply flex items-center justify-center text-xl rounded-md py-2 px-4 mr-5 cursor-pointer transition-opacity opacity-80;

      // theming and modifiers
      @apply text-gray-900 bg-muted;
      @apply hover:opacity-100;
    }
  }
}
</style>
