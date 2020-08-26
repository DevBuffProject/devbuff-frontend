<template>
  <span
    :class="[
      'chip',
      type && 'chip--type-' + type
    ]"
    :style="type === 'auto' && {
      backgroundColor: bgColor,
      color: textColor
    }"
  >
    {{ text }}
  </span>
</template>

<script>
import { colorString } from '~/kernel/UI/colors.js'

const color = require("color")

export default {
  name: 'v-badge',

  props: {
    text: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
  computed: {
    textSourceColor() {
      return color(colorString(this.text))
    },
    textColor() {
      const color = this.textSourceColor.darken(.5)

      const lumenDiff = this.bgColor.luminosity() - color.luminosity()

      return lumenDiff > 0.4 ? this.textSourceColor.darken(.3) : '#fff'
    },
    bgColor() {
      return this.textSourceColor.lighten(.8)
    },
  }
}
</script>

<style lang="scss" scoped>
.chip {
  background-color: var(--color-muted);
  padding: 0 .5rem 0 1rem;
  display: inline-flex;
  align-items: center;
  font-size: .8rem;
  line-height: 1;
  height: 1.5rem;
  border-radius: 10rem;
  &:after {
    content: "";
    display: inline-block;
    background-color: var(--color-background);
    width: .5rem;
    height: .5rem;
    border-radius: 10rem;
    margin-left: .5rem;
  }

  &--type-primary {
    background-color: var(--color-primary);
    color: var(--color-background-contrast);
  }
}
</style>
