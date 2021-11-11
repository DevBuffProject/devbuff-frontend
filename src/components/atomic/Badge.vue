<template>
  <div class="relative">
    <slot />

    <div
      v-if="value"
      class="
        px-2
        absolute
        -top-3
        -right-3
        h-[20px]
        min-w-[20px]
        flex
        items-center
        justify-center
        text-center text-sm text-white
        leading-4
        font-semibold
        bg-red-500
        rounded-xl
        shadow
      "
      v-text="value"
    />
  </div>
</template>

<script setup>
import { useAttrs, defineProps, toRefs } from 'vue'

const props = defineProps({
  value: { type: Number, default: null },
})
const { value } = toRefs(props)

const attrs = useAttrs()
</script>
