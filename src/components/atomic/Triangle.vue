<template>
  <!--  <svg-->
  <!--    width="78"-->
  <!--    height="38"-->
  <!--    viewBox="0 0 78 38"-->
  <!--    fill="none"-->
  <!--    xmlns="http://www.w3.org/2000/svg"-->
  <!--  >-->
  <!--    <path d="M1.26958 37L39 0.693888L76.7304 37H1.26958Z" v-bind="attrs" />-->
  <!--  </svg>-->

  <div
    :class="[
      'relative transform inline-block',
      {
        'rotate-[180deg]': direction === 'top',
      },
    ]"
    v-bind="attrs"
  >
    <em
      :class="[
        'absolute top-0 -left-px block w-[0px] h-[0px] border-solid',
        'border border-[12px] !border-b-0',
        'border-gray-200 dark:border-blueGray-700',
        styles.Triangle_border,
        borderClasses,
      ]"
    />
    <em
      :class="[
        'block w-[0px] h-[0px] border-solid relative',
        'border border-[11px] !border-b-0 border-white dark:border-blueGray-900',
        styles.Triangle,
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
