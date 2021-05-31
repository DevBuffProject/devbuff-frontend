<template>
  <teleport to="body" v-if="visible">
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
            'flex items-center bg-black bg-opacity-70',
          ]"
        >
          <div
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
          <div
            class="relative w-full h-auto max-h-screen"
            style="overflow: auto; overflow: overlay"
          >
            <div
              ref="windowRef"
              :class="[
                'max-w-[800px] my-10 mx-auto p-8 overflow-hidden relative z-50',
                'bg-white dark:bg-blueGray-700 shadow-xl rounded-md',
              ]"
            >
              <h1 v-if="title" class="mt-0">{{ title }}</h1>
              <div v-else-if="slots.title"><slot name="title" /></div>
              <div><slot /></div>
            </div>
          </div>
        </div>

        <template #fallback>
          <div
            :class="[
              'py-3 px-7 rounded-xl shadow-md backdrop-filter backdrop-blur-[5px]',
              'bg-black bg-opacity-80 dark:bg-blueGray-700 dark:bg-opacity-50',
            ]"
          >
            <AtomicLoadingBar />
          </div>
        </template>
      </suspense>
    </div>
  </teleport>
</template>

<script>
import { defineComponent, onMounted, onUnmounted } from 'vue'

const rooElement = window.document.documentElement
const { overflow } = window.getComputedStyle(rooElement)

export default defineComponent({
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

    onMounted(() => {
      rooElement.style.overflow = 'hidden'
      window.addEventListener('keyup', onEscapeClose)
    })

    onUnmounted(() => {
      rooElement.style.overflow = overflow
      window.removeEventListener('keyup', onEscapeClose)
    })

    return {
      slots,
      onClose,
    }
  },
})
</script>
