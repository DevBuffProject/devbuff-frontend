<template>
  <div
    v-if="visible"
    :class="'fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-40 dark:bg-opacity-70'"
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
          :class="'bg-white dark:bg-dark-900 shadow-xl rounded-2xl overflow-hidden p-4 z-50'"
          v-motion="'windowTransition'"
          :initial="{
            scale: 0.9,
            opacity: 0,
          }"
          :leave="{
            scale: 0.5,
            opacity: 0,
            transition: {
              type: 'Spring',
              opacity: { duration: 200 },
              scale: { duration: 300 },
            },
          }"
          :enter="{
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              duration: 300,
              delay: 50,
            },
          }"
        >
          <BaseButton
            class="
              text-dark-50
              bg-light-900
              dark:bg-dark-50 dark:text-dark-900
              rounded-full
              absolute
              right-4
              top-4
              p-1
            "
            @click="close"
          >
            <CloseIcon />
          </BaseButton>

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
