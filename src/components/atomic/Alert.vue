<template>
  <div v-if="show" class="m-2 relative rounded-xl overflow-hidden bg-white">
    <div
      ref="info"
      class="absolute top-0 left-0 w-full h-full bg-opacity-30"
      :class="{
        'bg-primary-500': type === 'info',
        'bg-green-500': type === 'success',
        'bg-yellow-500': type === 'warning',
        'bg-red-500': type === 'danger',
      }"
    ></div>

    <div class="relative grid grid-cols-[auto,1fr] gap-4 py-4 px-6 text-black">
      <InformationIcon v-if="type === 'info'" />
      <CheckCircleIcon v-else-if="type === 'success'" />
      <WarningTriangleIcon v-else-if="type === 'warning'" />
      <EmojiSadIcon v-else-if="type === 'danger'" />
      <div class="font-normal max-w-full flex-initial">
        <div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, watchEffect } from 'vue'

export default defineComponent({
  name: 'AtomicAlert',
  props: {
    type: {
      type: String,
      default: 'info',
      validate: (v) => ['info', 'success', 'warning', 'danger'].includes(v),
    },
    show: {
      type: Boolean,
      default: true,
    },
    message: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const info = ref()

    const highlight = () => {
      const classes = ['bg-opacity-100']
      info.value.style.transition = '50ms ease'
      info.value.classList.add(...classes)
      setTimeout(() => {
        info.value.style.transition = '3s ease'
        info.value.classList.remove(...classes)
      }, 200)
    }

    watch(() => props.show, highlight)
    watchEffect(highlight, {
      flush: 'post',
    })

    return {
      info,
    }
  },
})
</script>
