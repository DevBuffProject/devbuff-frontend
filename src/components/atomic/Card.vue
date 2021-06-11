<template>
  <div>
    <div
      :class="[
        'bg-white border border-gray-300 border-opacity-30',
        'dark:border-blueGray-700 dark:bg-blueGray-800 dark:bg-opacity-50',
        'grid p-4 rounded-xl relative',
        styles.CardShadow,
      ]"
      v-bind="attrs"
    >
      <template v-if="$slots.bottom || triangle"> </template>
      <div v-if="slots.header">
        <slot name="header" />
      </div>

      <div>
        <slot />
      </div>

      <div v-if="slots.footer || slots.controls" class="self-end -mb-4 py-2.5">
        <atomic-delimiter class="mb-2.5" />
        <div v-if="slots.footer">
          <slot name="footer" />
        </div>
        <div v-if="slots.controls">
          <slot name="controls" />
        </div>
      </div>
    </div>
    <div v-if="slots.bottom" class="mt-2 ml-px pl-4">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style module>
.CardShadow {
  box-shadow: 0px 10px 25px -5px rgb(0 0 0 / 7%);
}
</style>

<script>
import { defineComponent, useCssModule, useContext } from 'vue'
import { useAppearance } from '../../composes/utils'

export default defineComponent({
  name: 'AtomicCard',
  props: {
    triangle: {
      type: String,
      default: '',
    },
  },
  setup() {
    const styles = useCssModule()
    const { attrs, slots } = useContext()
    const { isDark } = useAppearance()

    return {
      styles,
      isDark,
      attrs,
      slots,
    }
  },
})
</script>
