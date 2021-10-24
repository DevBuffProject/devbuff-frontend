<template>
  <button
    class="
      overflow-hidden
      rounded-lg
      relative
      text-center
      transition-all
      p-[2px]
      focus:outline-none focus:ring-2 focus:ring-opacity-50
    "
    :class="{
      'appearance-none': disabled,
      'active:transform active:scale-95': !disabled,
      'ring-primary-400 dark:ring-primary-600 ': colorType === 'primary',
      'ring-success-400 dark:ring-success-600': colorType === 'success',
      'ring-warning-400 dark:ring-warning-600': colorType === 'warning',
      'ring-danger-400 dark:ring-danger-600': colorType === 'danger',
    }"
    :disabled="disabled"
  >
    <div
      class="w-full px-10 rounded-lg transition-colors"
      :class="{
        '!bg-light-900 dark:!bg-dark-500 !text-dark-900': disabled,
        'bg-light-900 bg-opacity-100 focus:ring': colorType === 'muted',
        'bg-primary-400 hover:bg-primary-400 active:bg-primary-500':
          colorType === 'primary',
        'bg-success-400 hover:bg-success-400 active:bg-success-500':
          colorType === 'success',
        'bg-warning-400 hover:bg-warning-400 active:bg-warning-500':
          colorType === 'warning',
        'bg-danger-400 hover:bg-danger-400 active:bg-danger-500':
          colorType === 'danger',
        'py-1': isSmall,
        'py-2': !isSmall,
      }"
    >
      <span
        class="flex items-center justify-center font-medium"
        :class="{
          'text-sm': isSmall,
          'text-dark-900': disabled,
          'invisible relative': loading,
        }"
      >
        <span v-if="slots.icon" class="mr-2">
          <slot name="icon" />
        </span>

        <span v-if="slots.default" class="whitespace-nowrap" v-bind="attrs">
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
          :class="
            type === 'muted' ? 'text-black dark:text-white' : 'text-white'
          "
        />
      </span>
    </div>
  </button>
</template>

<script>
import { defineComponent, computed, useAttrs, useSlots } from 'vue'

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
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const attrs = useAttrs()
    const slots = useSlots()
    const isTypeSupports = computed(() => types.includes(props.type))
    const colorType = computed(() =>
      isTypeSupports.value ? props.type : defaultType,
    )

    return { attrs, slots, isTypeSupports, colorType }
  },
})
</script>
