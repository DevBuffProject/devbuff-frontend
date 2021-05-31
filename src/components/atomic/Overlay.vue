<template>
  <teleport to="body" v-if="visible">
    <supsense>
      <div
        :class="[
          'fixed z-50 top-0 left-0 w-screen h-screen',
          'flex items-center justify-center',
          'bg-black bg-opacity-80',
        ]"
      >
        <div
          v-if="!hideControls"
          :class="[
            'fixed z-40 right-0 p-8 w-1/2 h-full flex justify-end',
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
        <slot />
      </div>
      <template #fallback>
        <AtomicLoadingOverlay />
      </template>
    </supsense>
  </teleport>
</template>

<script>
import { defineComponent, useContext } from 'vue'

export default defineComponent({
  name: 'AtomicOverlay',
  emits: ['onClose'],
  props: {
    visible: { type: Boolean, default: false },
    hideControls: { type: Boolean, default: false },
  },
  setup() {
    const { emit } = useContext()
    const onClose = () => emit('onClose')
    return { onClose }
  },
})
</script>
