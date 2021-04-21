<template>
  <span class="flex items-center">
    <span
      :class="[
        $style.Indicator,
        'w-2 h-2 mr-4 rounded-full',
        indicator === 'none' && 'bg-success-300',
        indicator === 'minor' && 'bg-warning-300',
        indicator === 'major' && 'bg-danger-300',
      ]"
    />
    <span class="mr-4"> {{ description }}. </span>
    <a v-if="href" :href="href">DevBuff health</a>
  </span>
</template>

<script>
export default {
  name: 'VStatusBadge',
  props: {
    indicator: {
      type: String,
      default: 'none',
      validate: (v) => ['none', 'minor', 'major'].includes(v),
    },
    description: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" module>
.Indicator {
  &::after {
    position: absolute;
    content: '';
    width: inherit;
    height: inherit;
    background: inherit;
    border-radius: inherit;
    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
}

@keyframes ping {
  75%,
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
