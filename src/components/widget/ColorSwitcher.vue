<template>
  <div
    role="button"
    class="text-purple-500 dark:text-yellow-500"
    @click="toggleDark"
  >
    <SunIcon class="w-[30px] h-[30px]" v-show="isLight" />
    <MoonIcon class="w-[30px] h-[30px]" v-show="isDark" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAppearance } from '../../composes/utils'

export default defineComponent({
  name: 'WidgetColorSwitcher',
  setup() {
    const { isDark, isLight, toggleDark } = useAppearance()
    return { isDark, isLight, toggleDark }
  },
})
</script>
