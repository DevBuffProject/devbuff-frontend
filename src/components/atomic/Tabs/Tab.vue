<template>
  <transition name="fade" :css="isTransitionEnabled">
    <div
      v-show="isTabVisible"
      class="absolute top-0 left-0 h-full w-full rounded-xl"
    >
      {{ height }}
      <div ref="tab">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onMounted,
  ref,
} from 'vue'
import { get, templateRef } from '@vueuse/core'

export default defineComponent({
  name: 'TabsSlide',
  props: {
    name: String,
  },
  setup(props) {
    const isTransitionEnabled = ref(false)

    const tabRef = templateRef('tab')
    const bindTab = inject('bindTab')
    bindTab({ name: props.name, tabRef })

    const activeTab = inject('activeTab')
    const isTabVisible = computed(() => get(activeTab, 'name') === props.name)

    onMounted(() => nextTick(() => (isTransitionEnabled.value = true)))

    return {
      isTransitionEnabled,
      isTabVisible,
    }
  },
})
</script>
