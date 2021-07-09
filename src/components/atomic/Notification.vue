<template>
  <div
    ref="info"
    v-show="show"
    :class="[
      'flex justify-center items-center font-medium m-1 py-1 px-2 bg-white rounded-md bg-opacity-10',
      `border-${type} text-${type} bg-${type}`,
    ]"
  >
    <div
      v-if="icon"
      class="mr-4"
    >
      <component :is="icon" />
      <InformationIcon v-if="type === 'info'" />
      <CheckCircleIcon v-else-if="type === 'success'" />
      <WarningTriangleIcon v-else-if="type === 'warning'" />
      <EmojiSadIcon v-else-if="type === 'danger'" />
    </div>
    <div class="text-xl font-normal max-w-full text-yellow-700 flex-initial">
      <div :class="['py-2', `text-${type}`]">
        {{ message }}
        <div
          class="text-sm font-base"
          v-if="description"
        >
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, watchEffect } from 'vue'

export default defineComponent({
  name: 'VNotification',
  props: {
    type: {
      type: String,
      default: 'info',
      validate: (v) => ['info', 'success', 'warning', 'danger'].includes(v),
    },
    show: { type: Boolean, default: true },
    message: { type: String, required: true },
    description: { type: String, default: undefined },
  },
  setup(props) {
    const info = ref()

    const highlight = () => {
      const classes = ['bg-opacity-50']
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

    return { info }
  },
})
</script>
