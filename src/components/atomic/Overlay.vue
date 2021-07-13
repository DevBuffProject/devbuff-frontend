<template>
  <div v-if="visible">
    <div
      :class="[
        'fixed z-50 top-0 left-0 w-screen h-screen',
        'flex items-center justify-center',
      ]"
    >
      <suspense>
        <div
          :class="[
            'fixed z-50 top-0 left-0 w-full h-full',
            'flex items-center bg-black bg-opacity-40',
          ]"
        >
          <div
            :class="[
              'fixed z-40 right-0 p-8 w-1/2 h-full flex justify-end group cursor-pointer',
              'group cursor-pointer',
            ]"
            @click="onClose"
          >
            <CloseIcon
              :class="[
                'w-[40px] h-[40px] text-white transition-all',
                'opacity-30 group-hover:opacity-100',
              ]"
            />
          </div>
          <div
            class="relative z-50 w-full h-auto max-h-screen py-10"
            style="overflow: auto; overflow: overlay"
          >
            <div class="max-w-[900px] mx-auto">
              <slot />
            </div>
          </div>
        </div>

        <template #fallback>
          <AtomicLoadingOverlay />
        </template>
      </suspense>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted } from 'vue'

const rooElement = window.document.documentElement
const { overflow } = window.getComputedStyle(rooElement)

export default defineComponent({
  name: 'AtomicOverlay',
  emits: ['onClose'],
  props: {
    visible: { type: Boolean, default: false },
    hideControls: { type: Boolean, default: false },
  },
  setup(_, { emit }) {
    const onEscapeClose = (e) => e.key === 'Escape' && onClose()
    const onClose = () => emit('onClose')

    onMounted(() => {
      rooElement.style.overflow = 'hidden'
      window.addEventListener('keyup', onEscapeClose)
    })

    onUnmounted(() => {
      rooElement.style.overflow = overflow
      window.removeEventListener('keyup', onEscapeClose)
    })

    return {
      onClose,
    }
  },
})
</script>
