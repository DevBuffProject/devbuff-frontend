<template>
  <transition v-on="hooks" :css="false">
    <slot />
  </transition>
</template>

<script setup>
import useActivatorSlot from '../../core/ui/composables/useActivatorSlot'

const props = defineProps({
  preset: {
    type: String,
    required: false,
    default: null,
    validator: (preset) => ['fade', 'scale'].includes(preset),
  },
})

const slot = useActivatorSlot()
console.log(slot[0])

const hooks = {}
</script>


