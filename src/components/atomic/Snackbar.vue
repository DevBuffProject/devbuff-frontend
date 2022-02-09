<template>
  <teleport to="body">
    <transition :css="false" @leave="(_, done) => motions.default.leave(done)">
      <div
        v-if="visible"
        :class="{
          'text-sm font-semibold flex justify-center items-center fixed top-6 left-1/2 px-12 py-3 shadow-2xl rounded-md z-50 tracking-widest uppercase bg-opacity-80 backdrop-filter backdrop-blur-4': true,
          'bg-primary-500': primary,
          'bg-yellow-500': warning,
          'bg-red-500 text-white': danger,
          'bg-dark-900 text-white': !(primary || warning || danger),
        }"
        v-motion="'default'"
        :initial="{ scale: 0, opacity: 0 }"
        :enter="{ scale: 1, opacity: 1 }"
        :leave="{
          scale: 0,
          opacity: 0,
          transition: {
            opacity: { duration: 200 },
          },
        }"
        @mouseover="clearCloseTimeout"
        @mouseout="setCloseTimeout"
      >
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.squircle {
  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="100%25" width="100%25"><mask id="squircle"><rect fill="white" width="100%25" height="100%25"/><svg x="-.01%25" style="overflow: visible"><path fill="black" width="20" height="20" d="M20 0H0v20C0 4 4 0 20 0z"/></svg><svg x="100.01%25" style="overflow: visible"><path fill="black" d="M20 20V0H0c16 0 20 4 20 20z" transform="translate(-20,0)"/></svg><svg x="100.01%25" y="100.01%25" style="overflow: visible"><path fill="black" d="M0 20h20V0c0 16-4 20-20 20z" transform="translate(-20,-20)"/></svg><svg x="-.01%25" y="100.01%25" style="overflow: visible"><path fill="black" d="M0 0v20h20C4 20 0 16 0 0z" transform="translate(0,-20)"/></svg></mask><rect fill="white" width="100%25" height="100%25" mask="url(%23squircle)"/></svg>');
  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="100%25" width="100%25"><mask id="squircle"><rect fill="white" width="100%25" height="100%25"/><svg x="-.01%25" style="overflow: visible"><path fill="black" width="20" height="20" d="M20 0H0v20C0 4 4 0 20 0z"/></svg><svg x="100.01%25" style="overflow: visible"><path fill="black" d="M20 20V0H0c16 0 20 4 20 20z" transform="translate(-20,0)"/></svg><svg x="100.01%25" y="100.01%25" style="overflow: visible"><path fill="black" d="M0 20h20V0c0 16-4 20-20 20z" transform="translate(-20,-20)"/></svg><svg x="-.01%25" y="100.01%25" style="overflow: visible"><path fill="black" d="M0 0v20h20C4 20 0 16 0 0z" transform="translate(0,-20)"/></svg></mask><rect fill="white" width="100%25" height="100%25" mask="url(%23squircle)"/></svg>');
}
</style>

<script setup>
import { defineProps, defineEmits, toRefs, ref } from 'vue'
import { useMotions } from '@vueuse/motion'
import { useVModel, whenever } from '@vueuse/core'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: Boolean, default: true },
  closeTimeout: { type: Number, default: 5000 },
  primary: { type: Boolean, default: false },
  warning: { type: Boolean, default: false },
  danger: { type: Boolean, default: false },
})
const { primary, warning, danger, closeTimeout, modelValue } = toRefs(props)
const visible = useVModel(props, 'modelValue', emit)
const motions = useMotions()

let timeout = 0
const setCloseTimeout = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => (visible.value = false), closeTimeout.value)
}
const clearCloseTimeout = () => clearTimeout(timeout)

whenever(visible, setCloseTimeout)
</script>
