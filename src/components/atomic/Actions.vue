<template>
  <div class="relative" ref="container">
    <div @click="isVisible ? hide() : show()" class="cursor-pointer">
      <slot name="activator" />
    </div>

    <transition name="fade" :duration="isVisible ? 100 : 500">
      <div
        v-show="isVisible"
        class="
          absolute
          top-0
          right-0
          z-50
          p-2
          -m-2
          rounded-xl
          overflow-hidden
          bg-white
          dark:bg-dark-800
          border border-light-900
          dark:border-dark-300
        "
        style="box-shadow: 0 3px 25px -2px rgba(0, 0, 0, 0.2)"
      >
        <div class="p-2 -m-2 mb-2 bg-gray-200 bg-opacity-50 dark:bg-dark-900">
          <div class="-m-px">
            <slot name="activator" />
          </div>
        </div>

        <div ref="dropdown" class="cursor-pointer">
          <slot />
        </div>
      </div>
    </transition>
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
