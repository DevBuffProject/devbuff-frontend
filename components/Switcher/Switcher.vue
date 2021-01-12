<template>
  <div class="v-switcher">
    <div class="v-switcher__highlight" ref="highlight" />
    <div
      v-for="(button, index) in values"
      :key="button.value"
      ref="button"
      @click="setValue(index)"
      class="v-switcher__switch"
      :class="activeIndex !== index && 'v-switcher__switch--state_active'"
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
 @layer components {
  .v-switcher {
    @apply relative inline-flex rounded bg-gray-200 text-black dark:bg-gray-700;

    &__switch {
      @apply py-1 px-5 cursor-pointer relative z-10 text-sm font-normal text-black dark:text-white;
    }
    &__switch--state_active {
      @apply text-gray-500 dark:text-gray-400;
    }

    &__highlight {
      @apply absolute z-0 top-0 left-0 h-full bg-white border-gray-200 text-black border rounded transition-all;
      @apply dark:bg-gray-400 dark:border-gray-700 dark:text-white
    }
  }
}
</style>
