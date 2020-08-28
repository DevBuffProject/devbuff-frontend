<template>
  <span
    :class="[
      'chip',
      type && 'chip--type-' + type
    ]"
    :style="type === 'auto' && {
      backgroundColor: lightenColor,
      color: darkenColor,
    }"
  >
    {{ text }}
    <span
      class="chip__hole"
      :style="{ border: '1px solid ' + darkenColor.alpha(.5) }"
    />
  </span>
</template>

<script>
import Color from '~/kernel/UI/colors.js'

console.log(Color.generateFromString)

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
      return Color(Color.generateFromString(this.text))
    },
    darkenColor() {
      return this.textSourceColor.luminate(.15)
    },
    lightenColor() {
      return this.textSourceColor.luminate(.85)
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
  &__hole {
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
