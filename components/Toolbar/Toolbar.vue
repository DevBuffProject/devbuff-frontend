<template>
  <div :class="[
    'py-3 bg-white border-b border-gray-200 dark:text-blueGray-100 dark:bg-blueGray-900 dark:border-blueGray-800',
    'sticky top-0 z-50', $style.toolbar
  ]">
    <div class="flex items-center container mx-auto">
      <div
        v-show="!hideBacklink"
        v-ripple.dark
        @click="$router.go(-1)"
        :class="[
          'flex items-center justify-center text-xl rounded py-2 px-4 mr-5 cursor-pointer transition-opacity opacity-80',
          'text-gray-900 bg-gray-200 dark:text-gray-600 dark:bg-blueGray-800 hover:opacity-100',
          $style.back_link
        ]"
      >
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

<style module>

@supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
  .toolbar {
    @apply bg-opacity-30 !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, .8);
  }
}

.back_link {
  width: 30px;
  height: 30px;
}
</style>
