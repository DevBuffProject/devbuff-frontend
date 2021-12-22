<template>
  <slot name="activator" />
  <div @click="active = true">
    {{ active }}
  </div>
  <teleport to="body">
    <div>
      <transition name="fade" appear>
        <div
          v-if="active"
          class="
            fixed
            z-50
            top-0
            left-0
            bottom-0
            right-0
            flex
            items-center
            justify-center
            bg-black bg-opacity-60
            dark:bg-opacity-90
          "
          ref="container"
        />
      </transition>

      <div
        v-show="active"
        class="
          fixed
          z-50
          top-0
          left-0
          bottom-0
          right-0
          flex
          items-center
          justify-center
        "
        @click="hide"
      >
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, ref, useSlots, toRefs } from 'vue'
import { useVModel, useScroll, syncRef, biSyncRef } from '@vueuse/core'
import addSlotEventListeners from '../../core/ui/composables/addSlotEventListeners'

const props = defineProps({ visible: { type: Boolean, default: false } })
const active = useVModel(props, 'visible')

const container = ref(null)
const scroll = useScroll(container)
syncRef(active, scroll)

addSlotEventListeners(
  useSlots().activator,
  'click',
  () => (active.value = true),
)

const hide = () => (active.value = false)
</script>
