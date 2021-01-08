<template>
  <div
    class="v-tooltip"
    @mouseover.self="onMouseover"
    @mouseout.self="onMouseout"
    @click="onMouseClick"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />

    <transition name="fade">
      <div @click.stop v-if="show" class="v-tooltip__tip">
        <div class="v-tooltip__tip-triangle" />
        <slot
          v-if="$scopedSlots.tip"
          name="tip"
          :hide="hide"
        />
        <span v-else>{{ text }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'v-tooltip',

  props: {
    activateByClick: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: null,
    }
  },

  data: () => ({
    show: false
  }),

  methods: {
    hide() {
      this.show = false
    },
    onMouseover() {
      if (!this.activateByClick) this.show = true
    },
    onMouseout() {
      if (!this.activateByClick) this.show = false
    },
    onMouseClick() {
      if (this.activateByClick) this.show = !this.show
    },
  }
}
</script>

<style lang="scss" scoped>
.v-tooltip {
  --tooltip-color: rgba(0, 0, 0, .9);

  position: relative;

  &__tip-triangle {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent var(--tooltip-color) transparent;
    transform: translateX(-50%);
  }

  &__tip {
    background-color: var(--tooltip-color);
    color: #fff;
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    padding: .2rem 1.5rem;
    border-radius: 100px;
    z-index: 99999999;
  }
}
</style>
