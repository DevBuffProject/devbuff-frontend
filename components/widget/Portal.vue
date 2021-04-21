<template>
  <div>
    <portal :to="target">
      <slot slot-scope="{ isDialog }" v-bind="{ isDialog }" />
    </portal>
    <template v-if="keepContent"><slot /></template>
  </div>
</template>

<script>
export default {
  name: 'WidgetPortal',
  props: {
    keepContent: {
      type: Boolean,
      default: false,
    },
    target: {
      type: String,
      required: true,
    },
  },
}
</script>
