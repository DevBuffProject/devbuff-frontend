<template>
  <div>
    <div
      :class="[
        'bg-white border border-gray-300 border-opacity-30 dark:border-blueGray-700 dark:bg-blueGray-900',
        'grid p-4 rounded-xl relative',
        styles.CardShadow,
      ]"
      v-bind="attrs"
    >
      <template v-if="$slots.bottom || triangle">
        <em
          v-if="isDark"
          :class="[
            styles.Triangle_border,
            'border-gray-300 dark:border-blueGray-700 dark:bg-blueGray-900',
            {
              'top-[100%]': triangle === 'bottom' || slots.bottom,
              'top-[-16px] transform rotate-[180deg]': triangle === 'top',
            },
          ]"
        />
        <em
          :class="[
            styles.Triangle,
            'border-white dark:border-blueGray-900',
            {
              'top-[100%]': triangle === 'bottom' || slots.bottom,
              'top-[-14px] transform rotate-[180deg]': triangle === 'top',
            },
          ]"
        />
      </template>
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

<script>
import { defineComponent, useCssModule } from 'vue'
import { useAppearance } from '../../composes/utils'

export default defineComponent({
  name: 'AtomicCard',
  props: {
    triangle: {
      type: String,
      default: '',
    },
  },
  setup(_, context) {
    const styles = useCssModule()
    const { isDark } = useAppearance()
    const { attrs, slots } = context

    return {
      styles,
      isDark,
      attrs,
      slots,
    }
  },
})
</script>

<style module>
.CardShadow {
  box-shadow: 0px 10px 25px -5px rgb(0 0 0 / 7%);
}
/* this CS forms the triangles */
.Triangle,
.Triangle_border {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
}

/* this border color controlls the color of the triangle (what looks like the fill of the triangle) */
.Triangle {
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  border-left-color: transparent !important;
  border-width: 7px;
  left: 17px;
}

/* this border color controlls the outside, thin border */
.Triangle_border {
  display: block;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  border-left-color: transparent !important;
  border-width: 8px;
  left: 16px;
}
</style>
