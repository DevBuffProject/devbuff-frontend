<template>
  <div>
    <!--    <pre>-->
    <!--x:{{ offsetX }}-->
    <!--y:{{ offsetY }}-->
    <!--startX: {{ startX }}-->
    <!--startY: {{ startY }}-->
    <!--offsetX: {{ offsetX }}-->
    <!--offsetY: {{ offsetY }}-->
    <!--<hr>-->
    <!--downX:{{ downX }} - offsetX:{{ offsetX }} = dx{{ downX - offsetX }}-->
    <!--startX:{{ startX }} - offsetX:{{ offsetX }} = dx2{{ startX - offsetX }}-->
    <!--dx: {{ dx }}-->
    <!--dy: {{ dy }}-->

    <!--currentDirection: {{ currentDirection }}-->
    <!--    </pre>-->

    <pre></pre>
    <!--    <div-->
    <!--      class="absolute h-[20px] bg-green-500 opacity-50"-->
    <!--      :style="{ left: `${startX}px`, top: `${startY}px`, width: `${Math.abs(startX - offsetX)}px` }"-->
    <!--    />-->
    <!--    <div-->
    <!--      class="absolute w-[20px] h-[20px] bg-red-500 rounded-full opacity-50"-->
    <!--      :style="{ left: `${offsetX - 10}px`, top: `${offsetY - 10}px` }"-->
    <!--    />-->
    <!--    <div class="absolute w-px h-full top-0 bg-red-500" :style="{ left: `${offsetX}px` }" />-->
    <!--    <div class="absolute h-px w-full left-0 bg-red-500" :style="{ top: `${offsetY}px` }" />-->
  </div>
</template>

<script setup>
import {
  set,
  templateRef,
  useEventListener,
  useSwipe,
  SwipeDirection,
} from '@vueuse/core'
import { computed, ref } from 'vue'

// const container = templateRef('container')
//
// const offsetX = ref(0)
// const offsetY = ref(0)
//
// const startX = ref(0)
// const startY = ref(0)
//
// const downX = ref(0)
// const downY = ref(0)
//
// const dx = ref(0)
// const dy = ref(0)
//
// const currentDirection = ref('none')
//
// const onTouchStart = (e) => {
//   const touch = e.touches[0]
//   set(startX, touch.clientX)
//   set(startY, touch.clientY)
//   set(downX, touch.clientX)
//   set(downY, touch.clientY)
//   useEventListener('touchmove', onTouchMove)
// }
// const onTouchMove = (e) => {
//   const touch = e.touches[0]
//   set(offsetX, touch.clientX)
//   set(offsetY, touch.clientY)
//
//   set(dx, downX.value - touch.offsetX)
//   set(dy, downY.value - touch.offsetY)
//
//   if (currentDirection.value !== 'none') return
//
//   if (Math.abs(dx.value) >= Math.abs(dy.value)) {
//     if (dx.value > 0) {
//       set(currentDirection, 'left')
//     } else {
//       set(currentDirection, 'right')
//     }
//   } else {
//     if (dy.value > 0) {
//       set(currentDirection, 'up')
//     } else {
//       set(currentDirection, 'down')
//     }
//   }
//
//   set(downX, null)
//   set(downY, null)
// }
//
// useEventListener('touchstart', onTouchStart)

let lockDirection
const trueDirection = ref(SwipeDirection.NONE)
const isSwipingX = computed(() =>
  [SwipeDirection.LEFT, SwipeDirection.RIGHT].includes(direction.value),
)
const { direction } = useSwipe(document, {
  onSwipe: () => {
    if (isSwipingX.value && !lockDirection) {
      set(trueDirection, direction.value)
    }
    lockDirection = true
  },
  onSwipeEnd: () => {
    set(trueDirection, SwipeDirection.NONE)
    lockDirection = false
  },
})
</script>
