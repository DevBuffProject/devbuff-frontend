<template>
  <AtomicOverlay :visible="visible">
    <div
      ref="windowRef"
      class="max-w-[800px] my-10 mx-auto relative"
      v-bind="attrs"
    >
      <div
        class="
          bg-white
          dark:bg-dark-900 dark:border dark:border-dark-500
          shadow-2xl
          rounded-2xl
          p-4
          z-50
        "
      >
        <div
          class="
            flex
            justify-end
            border-b border-light-700
            dark:border-dark-800
            px-4
            pb-2
            mb-4
            -mx-4
            -mt-2
          "
        >
          <div class="cursor-pointer flex items-center group" @click="close">
            <span class="opacity-30 text-dark-50 text-xs mr-4">press esc</span>
            <CloseIcon
              class="
                w-8
                h-8
                p-1
                text-dark-50
                bg-light-900
                dark:bg-dark-50 dark:text-dark-900
                rounded-full
                transition transition-opacity
                opacity-70
                transform
                group-hover:opacity-100
                group-active:scale-90
              "
            />
          </div>
        </div>
        <slot />
      </div>
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
  emits: ['close', 'update:visible'],
  props: {
    visible: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const slots = useSlots()
    const attrs = useAttrs()
    const onEscapeClose = (e) => e.key === 'Escape' && close()
    const close = () =>
      emit('close') ||
      emit('update:visible', false) ||
      window.removeEventListener('keyup', onEscapeClose)

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
