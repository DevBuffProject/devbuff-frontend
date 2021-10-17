<template>
  <AtomicOverlay
    :visible="visible"
    class="transition-all duration-200"
    :class="{
      'opacity-100': isShow,
      'opacity-0': !isShow,
    }"
  >
    <div
      ref="windowRef"
      class="max-w-[800px] my-10 mx-auto relative"
      v-bind="attrs"
    >
      <div
        class="
          bg-white
          dark:bg-dark-900
          border border-default
          shadow-2xl
          rounded-2xl
          p-4
          z-50
          transform
          transition-all
          duration-200
        "
        :class="{
          'scale-100': isShow,
          'scale-90': !isShow,
        }"
      >
        <div
          class="
            flex
            justify-end
            border-b border-default
            px-4
            pb-2
            mb-4
            -mx-4
            -mt-2
          "
        >
          <div class="cursor-pointer flex items-center group" @click="close">
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
  ref,
  nextTick,
} from 'vue'
import AtomicOverlay from './Overlay.vue'
import { useTransition } from '@vueuse/core'

export default defineComponent({
  components: { AtomicOverlay },
  emits: ['close', 'update:visible'],
  props: {
    visible: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const slots = useSlots()
    const attrs = useAttrs()
    const isShow = ref(false)
    const onEscapeClose = (e) => e.key === 'Escape' && close()
    const close = async () => {
      isShow.value = false
      setTimeout(() => emit('close') || emit('update:visible', false), 300)
    }

    onMounted(async () => {
      await nextTick()
      isShow.value = true
      window.addEventListener('keyup', onEscapeClose)
    })

    onUnmounted(() => window.removeEventListener('keyup', onEscapeClose))

    return {
      slots,
      attrs,
      isShow,
      close,
    }
  },
})
</script>
