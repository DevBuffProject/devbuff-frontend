<template>
  <AtomicOverlay to="body" :visible="visible">
    <div
      ref="windowRef"
      class="
        max-w-[800px]
        my-10
        mx-auto
        p-4
        overflow-hidden
        relative
        z-50
        bg-white
        dark:bg-dark-900 dark:border dark:border-dark-500
        shadow-2xl
        rounded-2xl
      "
    >
      <slot />
    </div>
  </AtomicOverlay>
</template>

<script>
import { defineComponent, onMounted, onUnmounted } from 'vue'
import AtomicOverlay from './Overlay.vue'

export default defineComponent({
  components: { AtomicOverlay },
  emits: ['close'],
  props: {
    title: { type: String, default: '' },
    visible: { type: Boolean, default: false },
  },
  setup(props, ctx) {
    const { slots, emit } = ctx
    const onEscapeClose = (e) => e.key === 'Escape' && close()
    const close = () =>
      emit('close') || window.removeEventListener('keyup', onEscapeClose)

    onMounted(() => window.addEventListener('keyup', onEscapeClose))
    onUnmounted(() => window.removeEventListener('keyup', onEscapeClose))

    return {
      slots,
      close,
    }
  },
})
</script>
