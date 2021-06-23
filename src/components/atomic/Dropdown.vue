<template>
  <div class="relative" ref="container">
    <div @click="isVisible ? hide() : show()">
      <slot name="activator" />
    </div>

    <div
      v-show="isVisible"
      class="transform translate-x-1/2 absolute top-[100%] right-1/2 z-50"
    >
      <div ref="dropdown">
        <div class="flex justify-center opacity-80 dark:bg-opacity-60">
          <AtomicTriangle direction="top" class="transform !border-black" />
        </div>
        <div
          :class="[
            'bg-opacity-80 dark:bg-opacity-50 backdrop-filter backdrop-blur-[5px]',
            'rounded-xl z-50 bg-black',
          ]"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useMotion } from '@vueuse/motion'
import { onClickOutside, useMagicKeys, whenever } from '@vueuse/core'

export default defineComponent({
  name: 'AtomicDropdown',
  emits: ['onOpen', 'onClose'],
  props: {
    byClick: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const container = ref()
    const dropdown = ref()
    const isVisible = ref(false)
    const { escape } = useMagicKeys()
    const motion = useMotion(dropdown, {
      initial: { y: 5, opacity: 0 },
      show: { y: 0, opacity: 1 },
    })

    const show = async () => {
      emit('onOpen')
      isVisible.value = true
      await motion.apply('show')
    }
    const hide = async () => {
      await motion.apply('initial')
      if (isVisible.value) {
        emit('onClose')
      }
      isVisible.value = false
    }

    motion.apply('initial')
    whenever(escape, hide)
    onClickOutside(dropdown, hide)

    return {
      container,
      dropdown,
      isVisible,
      hide,
      show,
    }
  },
})
</script>
