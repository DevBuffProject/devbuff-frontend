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
        <AtomicLoadingSpinner class="text-white" />
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'LoadingOverlay',
  emits: ['close', 'update:visible'],
  props: {
    visible: { type: Boolean, default: true },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const onEscapeClose = (e) => {
      if (e.key === 'Escape') {
        emit('close')
        emit('update:visible', false)
      }
    }

    onMounted(() => window.addEventListener('keyup', onEscapeClose))
    onUnmounted(() => window.removeEventListener('keyup', onEscapeClose))
  },
})
</script>
