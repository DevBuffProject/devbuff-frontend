<template>
  <div
    v-show="loading > 0"
    ref="info"
    :class="[
      'flex items-start px-5 py-4 rounded-md border-2 border-opacity-50 mb-5',
      `border-${type} text-${type} bg-${type} bg-opacity-10`,
    ]"
  >
    <svg-icon name="notifications/alert-circle" class="mr-4 text-3xl" />
    <span class="font-medium">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'VNotification',
  props: {
    loading: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      default: 'info',
      validate: (v) => ['success', 'warning', 'danger'].includes(v),
    },
    text: {
      type: String,
      required: true,
    },
  },
  watch: {
    loading() {
      this.hightlight()
    },
  },
  mounted() {
    this.hightlight()
  },
  methods: {
    hightlight() {
      const classes = ['bg-opacity-50']
      this.$refs.info.style.transition = '50ms ease'
      this.$refs.info.classList.add(...classes)
      setTimeout(() => {
        this.$refs.info.style.transition = '3s ease'
        this.$refs.info.classList.remove(...classes)
      }, 200)
    },
  },
}
</script>
