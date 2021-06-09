<template>
  <div
    :class="[
      'relative transform inline-block',
      {
        'rotate-[180deg]': direction === 'top',
      },
    ]"
  >
    <em
      :class="[
        styles.Triangle_border,
        borderClasses,
        'absolute top-0 -left-px block w-[0px] h-[0px] border-solid',
        'border border-[12px] !border-b-0',
        'border-gray-200 dark:border-blueGray-700 dark:bg-blueGray-900',
      ]"
    />
    <em
      v-bind="attrs"
      :class="[
        styles.Triangle,
        'block w-[0px] h-[0px] border-solid relative',
        'border border-[11px] !border-b-0 border-white dark:border-blueGray-900',
      ]"
    />
  </div>
</template>

<style module>
/* this CS forms the triangles */

/* this border color controlls the color of the triangle (what looks like the fill of the triangle) */
.Triangle_border,
.Triangle {
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  border-left-color: transparent !important;
  /*border-width: 11px;*/
  /*left: 17px;*/
}

/* this border color controlls the outside, thin border */
.Triangle_border {
  display: block;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  border-left-color: transparent !important;
}
</style>

<script>
import { defineComponent, useContext, useCssModule } from 'vue'

export default defineComponent({
  name: 'AtomicTriangle',
  inheritAttrs: false,
  props: {
    borderClasses: { type: [String, Array], default: '' },
    direction: {
      type: String,
      default: '',
      validate: (v) => ['top', 'bottom', 'left', 'right'].includes(v),
    },
  },
  setup() {
    const { attrs } = useContext()
    const styles = useCssModule()

    return { styles, attrs }
  },
})
</script>
