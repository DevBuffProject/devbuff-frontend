<template>
  <AtomicOverlay :visible="visible">
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
      v-bind="attrs"
    >
      <slot />
    </div>
  </AtomicOverlay>
</template>

<script>
import {
  defineComponent,
  useAttrs,
  useSlots,
  onMounted,
  onUnmounted,
} from 'vue'
import AtomicOverlay from './Overlay.vue'

export default defineComponent({
  components: { AtomicOverlay },
  emits: ['close'],
  props: {
    visible: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const slots = useSlots()
    const attrs = useAttrs()
    const onEscapeClose = (e) => e.key === 'Escape' && close()
    const close = () =>
      emit('close') || window.removeEventListener('keyup', onEscapeClose)

    onMounted(() => window.addEventListener('keyup', onEscapeClose))
    onUnmounted(() => window.removeEventListener('keyup', onEscapeClose))

    return {
      slots,
      attrs,
      close,
    }
  },
})
</script>
