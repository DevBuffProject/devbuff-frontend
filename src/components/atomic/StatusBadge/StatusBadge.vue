<template>
  <div class="group flex items-center">
    <span
      :class="[
        'w-2 h-2 mr-4 rounded-full transition-transform transform group-hover:scale-150',
        $style.Indicator,
        {
          'bg-success-300': indicator === 'none',
          'bg-warning-300': indicator === 'minor',
          'bg-danger-300': indicator === 'major',
          'bg-danger-500': indicator === 'critical',
        },
      ]"
    />
    <a
      :href="href"
      target="_blank"
      :class="[
        'transition-colors border-b',
        'border-opacity-10 hover:text-primary hover:border-primary hover:border-opacity-20',
      ]"
    >
      {{ description }}
    </a>
  </div>
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

<style module>
.Indicator::after {
  position: absolute;
  content: '';
  width: inherit;
  height: inherit;
  background: inherit;
  border-radius: inherit;
  animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%,
  100% {
    transform: scale(5);
    filter: blur(2px);
    opacity: 0;
  }
}
</style>
