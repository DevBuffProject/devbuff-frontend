<template>
  <div
    ref="info"
    v-show="show"
    :class="[
      'flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md bg-opacity-10',
      `border-${type} text-${type} bg-${type}`,
    ]"
  >
    <div v-if="icon" class="mr-4">
      <component :is="icon" />
    </div>
    <div class="text-xl font-normal max-w-full text-yellow-700 flex-initial">
      <div class="py-2">
        {{ message }}
        <div class="text-sm font-base" v-if="description">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, watchEffect } from 'vue'

import {
  InformationIcon,
  WarningTriangleIcon,
  CheckCircleIcon,
  EmojiSadIcon,
} from '@iconicicons/vue3'
export default defineComponent({
  name: 'VNotification',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'info',
      validate: (v) => ['info', 'success', 'warning', 'danger'].includes(v),
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
    const icon = ref()

    switch (props.type) {
      case 'warning': {
        icon.value = WarningTriangleIcon
        break
      }
      case 'info': {
        icon.value = InformationIcon
        break
      }
      case 'success': {
        icon.value = CheckCircleIcon
        break
      }
      case 'danger': {
        icon.value = EmojiSadIcon
        break
      }
    }

    const highlight = () => {
      console.log('as')
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

    return {
      info,
      icon,
    }
  },
})
</script>
