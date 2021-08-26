<template>
  <div>
    <div
      :class="styles.CardShadow"
      class="
        bg-white
        border border-gray-300 border-opacity-30
        dark:border-dark-700 dark:bg-dark-800 dark:bg-opacity-50
        grid
        p-4
        rounded-xl
        relative
        overflow-hidden
      "
      v-bind="attrs"
    >
      <template v-if="$slots.bottom || triangle" />
      <div v-if="slots.header">
        <slot name="header" />
      </div>

      <div class="break-all">
        <slot />
      </div>

      <div v-if="slots.footer || slots.controls" class="self-end -mb-4 py-2.5">
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
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
}
</style>

<script>
import { defineComponent, useAttrs, useCssModule, useSlots } from 'vue'
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
    const attrs = useAttrs()
    const slots = useSlots()
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
