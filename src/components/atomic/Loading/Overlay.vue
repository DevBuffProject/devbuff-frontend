<template>
  <transition name="scale">
    <div
      v-if="visible"
      class="
        fixed
        z-50
        top-0
        left-0
        w-screen
        h-screen
        flex
        items-center
        justify-center
      "
    >
      <div
        class="
          py-3
          px-7
          rounded-xl
          shadow-md
          backdrop-filter backdrop-blur-[5px]
          bg-black bg-opacity-40
          dark:bg-dark-700 dark:bg-opacity-50
          text-xl
        "
      >
        <Loading class="text-white" />
      </div>
    </div>
  </transition>
</template>

<script>
import Loading from './Spinner.vue'

export default {
  name: 'LoadingOverlay',
  props: {
    visible: { type: Boolean, default: true },
  },
  components: { Loading },
}
</script>
