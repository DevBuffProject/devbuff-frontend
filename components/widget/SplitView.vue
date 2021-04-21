<template>
  <div class="w-full">
    <div class="grid grid-cols-6 gap-6">
      <atomic-card v-if="$scopedSlots.list" class="col-span-3">
        <slot name="list" v-bind="{ showView, hideView, isViewShown }" />
      </atomic-card>
      <div v-if="isViewShown" :class="['col-span-3 h-full']">
        <slot name="viewport" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VSplitView',
  data: () => ({
    isViewShown: false,
  }),
  methods: {
    showView() {
      this.isViewShown = true
    },
    hideView() {
      this.isViewShown = false
    },
  },
}
</script>

<style module>
.ViewportShadow {
  box-shadow: -20px 0 25px -10px rgb(0 0 0 / 10%);
}
</style>
