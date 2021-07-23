<template>
  <div class="relative" ref="container">
    <div @click="isVisible ? hide() : show()">
      <slot name="activator" />
    </div>

    <div
      v-show="isVisible"
      class="
        absolute
        top-0
        right-0
        z-50
        p-2
        -m-2
        rounded-lg
        overflow-hidden
        bg-white
        dark:bg-dark-800
      "
      style="box-shadow: 0 3px 25px -2px rgba(0, 0, 0, 0.2)"
    >
      <div class="p-2 -m-2 mb-2 bg-gray-200 bg-opacity-50 dark:bg-dark-900">
        <slot name="activator" />
      </div>

      <div ref="dropdown">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useMotion } from '@vueuse/motion'
import { onClickOutside, useMagicKeys, whenever } from '@vueuse/core'

export default defineComponent({
  name: 'AtomicActions',
  emits: ['open', 'close'],
  setup(props, { emit }) {
    const container = ref()
    const dropdown = ref()
    const isVisible = ref(false)
    const { escape } = useMagicKeys()

    const show = async () => {
      emit('open')
      isVisible.value = true
    }
    const hide = async () => {
      if (isVisible.value) emit('close')
      isVisible.value = false
    }

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
