<template>
  <button
    :class="[
      `
        px-6 overflow-hidden rounded relative inline-block text-center
        transition-all border focus:ring focus:outline-none
      `,
      colorType === 'primary' &&
        'bg-primary hover:bg-primary-400 active:bg-primary-600 hover:border-primary-400 active:border-primary-600 border-primary ring-primary-300',
      colorType === 'success' &&
        'bg-success hover:bg-success-400 active:bg-success-600 hover:border-success-400 active:border-success-600 border-success ring-success-300',
      colorType === 'warning' &&
        'bg-warning hover:bg-warning-400 active:bg-warning-600 hover:border-warning-400 active:border-warning-600 border-warning ring-warning-300',
      colorType === 'danger' &&
        'bg-danger hover:bg-danger-400 active:bg-danger-600 hover:border-danger-400 active:border-danger-600 border-danger ring-danger-300',
      isDepressed &&
        `
          bg-opacity-10 border-opacity-0 hover:bg-opacity-20 hover:border-opacity-20
          active:bg-opacity-30 active:border-opacity-30
        `,
      isSmall ? 'py-0.5' : 'py-1.5',
    ]"
    v-bind="$attrs"
  >
    <span
      :class="[
        'flex items-center justify-center',
        isDepressed && [
          colorType === 'primary' && 'text-primary',
          colorType === 'success' && 'text-success',
          colorType === 'warning' && 'text-warning',
          colorType === 'danger' && 'text-danger',
        ],
        !isDepressed && !isMuted && 'text-white',
        isSmall && 'text-sm',
      ]"
    >
      <span v-if="slots.icon" class="mr-2">
        <slot name="icon" />
      </span>
      <span
        v-if="slots.default"
        :class="[
          'font-normal whitespace-nowrap',
          loading && 'invisible relative',
        ]"
      >
        <slot />
      </span>
    </span>
    <span
      v-if="loading"
      class="
        absolute
        w-full
        h-full
        top-0
        left-0
        flex
        items-center
        justify-center
      "
    >
      <atomic-loading-spinner
        :class="isMuted ? 'text-black dark:text-white' : 'text-white'"
      />
    </span>
  </button>
</template>

<script>
import { defineComponent, computed } from 'vue'

const types = ['muted', 'primary', 'success', 'warning', 'danger']
const defaultType = 'muted'

export default defineComponent({
  name: 'AtomicButton',
  props: {
    type: {
      type: String,
      default: 'primary',
      validate: (v) => types.includes(v),
    },
    isOutline: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    isWide: {
      type: Boolean,
      default: false,
    },
    isDepressed: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const isMuted = computed(() => props.type === 'muted')
    const isTypeSupports = computed(() => types.includes(props.type))
    const colorType = computed(() =>
      isTypeSupports.value ? props.type : defaultType,
    )

    return { isMuted, isTypeSupports, colorType, ...ctx }
  },
})
</script>
