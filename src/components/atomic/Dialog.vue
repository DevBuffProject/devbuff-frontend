<template>
  <AtomicOverlay to="body" :visible="visible" @onClose="onClose">
    <div
      ref="windowRef"
      class="
        max-w-[800px]
        my-8
        mx-auto
        p-8
        overflow-hidden
        relative
        z-50
        bg-white
        dark:bg-blueGray-700
        shadow-2xl
        rounded-xl
      "
    >
      <h1 v-if="title" class="mt-0">
        {{ title }}
      </h1>
      <div v-else-if="slots.title">
        <slot name="title" />
      </div>
      <slot />
    </div>
  </AtomicOverlay>
</template>

<script>
import { defineComponent } from 'vue'
import AtomicOverlay from './Overlay.vue'

export default defineComponent({
  components: { AtomicOverlay },
  emits: ['onClose'],
  props: {
    title: { type: String, default: '' },
    visible: { type: Boolean, default: false },
  },
  setup(props, ctx) {
    const { slots, emit } = ctx
    const onEscapeClose = (e) => e.key === 'Escape' && onClose()
    const onClose = () =>
      emit('onClose') || window.removeEventListener('keyup', onEscapeClose)

    return {
      slots,
      onClose,
    }
  },
})
</script>
