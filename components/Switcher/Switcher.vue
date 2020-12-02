<template>
  <div class="v-switcher">
    <div class="v-switcher__highlight" ref="highlight" />
    <div
      v-for="(button, index) in values"
      :key="button.value"
      ref="button"
      @click="setValue(index)"
      :class="[
        'v-switcher__button',
        activeIndex !== index && 'v-switcher__button--active'
      ]"
    >
      {{ button.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-switcher',

  model: {
    event: 'change',
    prop: 'value'
  },

  props: {
    values: {
      type: Array,
      required: true,
    },
    value: {
      type: [ String, Number ],
      default: null
    }
  },

  data: () => ({
    activeIndex: 0
  }),

  watch: {
    value: {
      handler() {
        this.computeHighlightStyles()
      }
    }
  },

  methods: {
    setValue(index) {
      const value = this.values[index] && this.values[index].value

      if (value === this.value)

      this.activeIndex = index
      this.computeHighlightStyles()
      this.$emit('change', value)
    },
    computeHighlightStyles() {
      const highlight = this.$refs.highlight
      const activeIndex = this.value
        ? this.values.findIndex(v => v.value === this.value)
        : 0
      const button = this.$refs.button[activeIndex]

      if (!button) return false

      this.activeIndex = activeIndex

      const width = button.offsetWidth
      const left = button.offsetLeft > 0
        ? button.offsetLeft - 1
        : button.offsetLeft

      highlight.style.width = `${width}px`
      highlight.style.transform = `translateX(${left}px)`
    }
  },

  mounted() {
    this.computeHighlightStyles()
    setTimeout(() => this.$refs.highlight.style.opacity = 1, 300)
  }
}
</script>

<style lang="scss" scoped>
.v-switcher {
  position: relative;
  display: inline-flex;
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--color-muted-accent);

  &__button {
    position: relative;
    padding: .2rem 1rem;
    font-size: .8rem;
    font-weight: 400;
    cursor: pointer;
    z-index: 10;
    transition: transform 1s var(--base-transition);
  }

  &__button--active {
    opacity: .5;
    color: var(--color-text) !important;
  }

  &__button:active {
    transform: scale(.95);
  }

  &__highlight {
    position: absolute;
    background-color: var(--color-background-contrast);
    height: 100%;
    width: 0px;
    top: 0;
    opacity: 0;
    border-radius: 5px;
    border: 1px solid var(--color-muted-accent);
    box-sizing: border-box;
    transition: .5s var(--base-transition);
    transition-property: transform, width, opacity;
    z-index: 9;
  }
}
</style>
