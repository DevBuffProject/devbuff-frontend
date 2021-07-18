<template>
  <div>
    <div class="mb-8 flex justify-center relative z-50">
      <div
        class="
          px-10
          flex
          justify-center
          rounded-xl
          bg-light-400
          dark:bg-dark-800
        "
      >
        <div
          v-for="tab of tabs"
          :key="tab.name"
          v-text="tab.name"
          @click="setActiveTab(tab)"
          class="
            py-2
            px-6
            mx-2
            cursor-pointer
            transition-all
            border-b-2 border-primary-500
          "
          :class="{
            'text-primary-500 border-opacity-100': tab.name === activeTab.name,
            'border-opacity-0': tab.name !== activeTab.name,
          }"
        />
      </div>
    </div>

    <div
      class="rounded-xl relative overflow-hidden"
      ref="container"
      :style="{ height: `${containerHeightTween}px` }"
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
  watch,
  nextTick,
  onMounted,
} from 'vue'
import {
  get,
  useTransition,
  TransitionPresets,
  set,
  useThrottleFn,
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

    // Height container transition
    const duration = 100
    const containerHeight = ref(0)
    const containerHeightTween = useTransition(containerHeight, {
      duration,
      transition: TransitionPresets.easeInOutCubic,
    })
    const tabRef = computed(() => activeTab.value.tabRef)
    const setHeight = useThrottleFn(
      () => nextTick(() => set(containerHeight, get(tabRef, 'clientHeight'))),
      duration,
    )
    onMounted(() => {
      const elementObserver = new MutationObserver(setHeight)
      const elementResizeObserver = new ResizeObserver((e) => {
        console.log('observe', e)
        setHeight()
      })
      const observerOptions = {
        childList: true,
        subtree: true,
        characterData: true,
      }
      console.dir(tabRef)
      elementObserver.observe(get(tabRef), observerOptions)
      elementResizeObserver.observe(
        get(tabRef, 'firstElementChild'),
        observerOptions,
      )
    })

    watch(activeTab, setHeight)

    return {
      tabs,
      activeTab,
      containerHeightTween,
      setActiveTab,
    }
  },
})
</script>
