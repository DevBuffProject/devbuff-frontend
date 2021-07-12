<template>
  <div
    role="button"
    class="focusable text-purple-500 dark:text-yellow-500"
    @click="toggleDark"
    @keypress.enter="toggleDark"
    v-bind="attrs"
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
  setup(_, ctx) {
    const { isDark, isLight, toggleDark } = useAppearance()
    const { attrs } = ctx
    return { isDark, isLight, toggleDark, attrs }
  },
})
</script>
