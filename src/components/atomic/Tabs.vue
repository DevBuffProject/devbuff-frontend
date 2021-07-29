<template>
  <div>
    <div class="mb-8 flex justify-center">
      <div
        class="
          flex
          justify-center
          rounded-xl
          bg-light-500
          dark:bg-dark-500
          overflow-hidden
        "
      >
        <div
          v-for="tab of tabs"
          :key="tab.name"
          v-text="tab.name"
          @click="setActiveTab(tab)"
          class="py-2 px-6 cursor-pointer transition-all"
          :class="{
            'text-dark-900 dark:text-light-100 bg-gray-200 dark:bg-dark-200':
              tab.name === activeTab.name,
            'border-opacity-0': tab.name !== activeTab.name,
          }"
        />
      </div>
    </div>
    <div
      class="rounded-xl relative overflow-hidden"
      ref="container"
      :style="{ height: `${containerHeight}px` }"
    >
      <slot v-bind="{ activeTab }" />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  provide,
  computed,
  onMounted,
  nextTick,
} from 'vue'
import {
  get,
  useElementSize,
  syncRef,
  templateRef,
  whenever,
} from '@vueuse/core'

export default defineComponent({
  name: 'Tabs',
  async setup() {
    const tabs = ref([])
    provide('bindTab', (tab) => tabs.value.push(tab))

    const activeTab = ref({ name: '', ref: {} })
    provide('activeTab', activeTab)

    const setActiveTab = (tab) => (activeTab.value = tab)
    onMounted(() => setActiveTab(tabs.value[0]))

    const containerHeight = ref(0)
    const containerRef = templateRef('container')
    const tabRef = computed(() => get(activeTab, 'tabRef'))
    const { height: tabHeight } = useElementSize(tabRef)
    syncRef(tabHeight, containerHeight)
    onMounted(() =>
      setTimeout(() => {
        containerRef.value.classList.add('transition-all')
        containerRef.value.classList.add('ease-linear')
        containerRef.value.classList.add('duration-200')
      }),
    )

    return {
      tabs,
      activeTab,
      containerHeight,
      setActiveTab,
    }
  },
})
</script>
