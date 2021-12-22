<template>
  <slot name="activator" v-bind="slotBindings" />

  <teleport to="body">
    <transition name="fade" :duration="450">
      <div
        v-if="internalActive"
        class="fixed z-50 top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-60 dark:bg-opacity-90"
      ></div>
    </transition>

    <transition :css="false" v-on="dialogTransitionHandlers">
      <div
        v-if="internalActive"
        class="fixed z-50 w-full top-0 bottom-0 overflow-y-auto flex"
        @click="hide"
      >
        <div
          class="min-h-screen mx-auto flex flex-col"
          :style="{ maxWidth: maxWidth }"
        >
          <div class="min-h-10 h-full w-full" />

          <div class="window relative z-50" ref="dialogRef" @click.stop>
            <slot v-bind="slotBindings" />
          </div>

          <div class="min-h-10 h-full w-full" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed, defineProps, reactive, ref } from 'vue'
import { useVModel, syncRef, biSyncRef, useScrollLock } from '@vueuse/core'
import {
  acceleratedEasing,
  deceleratedEasing,
} from '../../../core/ui/animation/easing'
import { nullifyTransforms } from '../../../core/ui/animation/utils'

const props = defineProps({
  visible: { type: Boolean, default: false },
  maxWidth: { type: String, default: '500px' },
})
const active = useVModel(props, 'visible')
const internalActive = ref(false)
biSyncRef(active, internalActive)

const scroll = useScrollLock(document.documentElement)
syncRef(active, scroll)

// states
const slotBindings = computed(() => ({
  show,
  hide,
  isVisible: internalActive.value,
}))

const hide = () => (internalActive.value = false)
const show = (e) => {
  internalActive.value = true
  recalculateTransformOrigin(e.target)
}

const dialogRef = ref(null)
const transformOrigin = reactive({ x: 0, y: 0 })
const recalculateTransformOrigin = async (target) => {
  await new Promise(requestAnimationFrame)
  const targetRect = target.getBoundingClientRect()
  const dialogRect = nullifyTransforms(dialogRef.value)
  const [originX, originY] = window
    .getComputedStyle(dialogRef.value)
    .transformOrigin.split(' ')
    .map(parseFloat)

  const offsetX = targetRect.left + targetRect.width / 2
  const offsetY = targetRect.top + targetRect.height / 2

  transformOrigin.x = offsetX - (originX + dialogRect.x)
  transformOrigin.y = offsetY - (originY + dialogRect.y)
}

const dialogTransitionHandlers = {
  async enter(el, done) {
    await new Promise(requestAnimationFrame)
    const { x, y } = transformOrigin
    const animation = el.animate(
      [
        { transform: `translate(${x}px, ${y}px) scale(0.1)`, opacity: 0 },
        { transform: '' },
      ],
      { duration: 500, easing: acceleratedEasing },
    )
    animation.finished.then(done)
  },
  async leave(el, done) {
    await new Promise(requestAnimationFrame)
    const { x, y } = transformOrigin
    const animation = el.animate(
      [
        { transform: '' },
        { transform: `translate(${x}px, ${y}px) scale(0.1)`, opacity: 0 },
      ],
      { duration: 250, easing: deceleratedEasing },
    )
    animation.finished.then(done)
  },
}
</script>
