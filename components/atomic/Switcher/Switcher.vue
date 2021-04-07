<template>
  <div
    class="relative inline-flex rounded bg-gray-200 text-black dark:bg-blueGray-700"
  >
    <div
      ref="highlight"
      class="absolute z-0 top-0 left-0 h-full bg-white border-gray-200 text-black border border-2 rounded transition-all dark:bg-blueGray-600 dark:border-blueGray-700 dark:text-white"
    />
    <div
      v-for="(button, index) in values"
      :key="button.value"
      ref="button"
      class="py-1 px-5 cursor-pointer relative z-10 text-xs font-normal"
      :class="{
        'text-gray-500 dark:text-blueGray-500': activeIndex !== index,
        'text-black dark:text-blueGray-100': activeIndex === index,
      }"
      @click="setValue(index)"
    >
      {{ button.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'VSwitcher',

  model: {
    event: 'change',
    prop: 'value',
  },

  props: {
    values: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number],
      default: null,
    },
  },

  data: () => ({
    activeIndex: 0,
  }),

  watch: {
    value: {
      handler() {
        this.computeHighlightStyles()
      },
    },
  },

  mounted() {
    this.computeHighlightStyles()
    setTimeout(() => (this.$refs.highlight.style.opacity = 1), 300)
  },

  methods: {
    setValue(index) {
      const value = this.values[index] && this.values[index].value

      if (value === this.value) {
        this.activeIndex = index
      }
      this.computeHighlightStyles()
      this.$emit('change', value)
    },
    computeHighlightStyles() {
      const highlight = this.$refs.highlight
      const activeIndex = this.value
        ? this.values.findIndex((v) => v.value === this.value)
        : 0
      const button = this.$refs.button[activeIndex]

      if (!button) {
        return false
      }

      this.activeIndex = activeIndex

      const width = button.offsetWidth
      const left =
        button.offsetLeft > 0 ? button.offsetLeft - 1 : button.offsetLeft

      highlight.style.width = `${width}px`
      highlight.style.transform = `translateX(${left}px)`
    },
  },
}
</script>
