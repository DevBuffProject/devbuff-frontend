<template>
  <div
    class="v-tooltip"
    v-bind="$attrs"
    @mouseover.self="onMouseover"
    @mouseout.self="onMouseout"
    @click="onMouseClick"
    v-on="$listeners"
  >
    <slot />

    <transition name="fade">
      <div v-if="show" class="v-tooltip__tip" @click.prevent.stop>
        <div class="v-tooltip__tip-triangle" />
        <slot v-if="$scopedSlots.tip" name="tip" :hide="hide" />
        <span v-else> {{ text }} </span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VTooltip',

  props: {
    activateByClick: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    show: false,
  }),

  methods: {
    hide() {
      this.show = false
    },
    onMouseover() {
      if (!this.activateByClick) {
        this.show = true
      }
    },
    onMouseout() {
      if (!this.activateByClick) {
        this.show = false
      }
    },
    onMouseClick() {
      if (this.activateByClick) {
        this.show = !this.show
      }
    },
  },
}
</script>
