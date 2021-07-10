<template>
  <div class="relative" ref="container">
    <div @click="toggle">
      <slot name="activator" v-bind="{ isVisible }" />
    </div>

    <transition name="slide-up">
      <div v-if="isVisible" class="absolute top-[100%] -right-2 z-50">
        <div ref="dropdown" class="relative">
          <div
            class="
              bg-white
              dark:bg-blueGray-800
              p-4
              -mt-px
              z-50
              rounded-xl
              overflow-hidden
            "
            style="box-shadow: 0 20px 50px 0 rgb(0 0 0 / 20%)"
          >
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { onClickOutside, useMagicKeys, whenever } from '@vueuse/core'

export default defineComponent({
  name: 'AtomicDropdown',
  emits: ['open', 'close'],
  setup(props, { emit }) {
    const container = ref()
    const dropdown = ref()
    const isVisible = ref(false)
    const { escape } = useMagicKeys()

    const show = async () => {
      if (!isVisible.value) emit('open')
      isVisible.value = true
    }
    const hide = async () => {
      if (isVisible.value) emit('close')
      isVisible.value = false
    }
    const toggle = () => (isVisible.value ? hide() : show())

    whenever(escape, hide)
    onClickOutside(container, hide)

    return {
      container,
      dropdown,
      isVisible,
      hide,
      show,
      toggle,
    }
  },
})
</script>
