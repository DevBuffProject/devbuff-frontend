<template>
  <div
    v-if="visible"
    ref="overlayRef"
    class="
      fixed
      z-50
      top-0
      left-0
      right-0
      bottom-0
      flex
      items-center
      justify-center
      bg-black bg-opacity-40
      dark:bg-opacity-70
    "
    v-motion="'overlayTransition'"
    :initial="{ opacity: 0 }"
    :leave="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
  >
    <div
      class="relative z-50 w-full max-h-screen"
      style="overflow: auto; overflow: overlay"
    >
      <div
        class="w-full py-10 mx-auto relative"
        :style="{ 'max-width': maxWidth }"
        v-bind="attrs"
      >
        <div
          ref="windowRef"
          class="
            bg-white
            dark:bg-dark-900
            border border-default
            shadow-xl
            rounded-2xl
            p-4
            z-50
          "
          v-motion="'windowTransition'"
          :initial="{ scale: 1.5, opacity: 0 }"
          :leave="{ scale: 0, opacity: 0 }"
          :enter="{
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              duration: 300,
            },
          }"
        >
          <div class="flex justify-end px-4 pb-2 mb-4 -mx-4 -mt-2">
            <BaseButton
              class="
                p-1
                text-dark-50
                bg-light-900
                dark:bg-dark-50 dark:text-dark-900
                rounded-full
              "
              v-ripple
              @click="close"
            >
              <CloseIcon />
            </BaseButton>
          </div>

          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAttrs, defineProps, defineEmits, toRefs } from 'vue'
import { useMotions } from '@vueuse/motion'

const attrs = useAttrs()
const emit = defineEmits(['close', 'update:visible'])
const props = defineProps({
  visible: { type: Boolean, default: false },
  maxWidth: { type: String, default: '800px' },
})
const { visible, maxWidth } = toRefs(props)

const close = async () => {
  await leaveTransition()
  emit('close')
  emit('update:visible', false)
}

const leaveTransition = async () => {
  const { windowTransition, overlayTransition } = useMotions()
  await Promise.all([
    overlayTransition.apply('leave'),
    windowTransition.apply('leave'),
  ])
}
</script>
