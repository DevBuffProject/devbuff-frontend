<template>
  <button
    class="
      overflow-hidden
      rounded-md
      relative
      text-center
      transition-all
      p-[2px]
      focus:outline-none focus:ring-2 focus:ring-opacity-50
    "
    :class="{
      'ring-primary-400 dark:ring-primary-600 ': colorType === 'primary',
      'ring-success-400 dark:ring-success-600': colorType === 'success',
      'ring-warning-400 dark:ring-warning-600': colorType === 'warning',
      'ring-danger-400 dark:ring-danger-600': colorType === 'danger',
    }"
    v-focusable.indexOnly
  >
    <div
      class="px-10 rounded-md transition-colors"
      :class="[
        colorType === 'muted' && [
          `
          bg-light-900 bg-opacity-100
          dark:(bg-dark-300 hover:bg-dark-400 active:bg-dark-500)
          focus:(ring ring)
        `,
          isDepressed
            ? 'bg-opacity-0 dark:bg-opacity-0'
            : 'bg-opacity-10 dark:bg-opacity-40',
        ],
        {
          'bg-primary-400 hover:bg-primary-400 active:bg-primary-500':
            colorType === 'primary',
          'bg-success-400 hover:bg-success-400 active:bg-success-500':
            colorType === 'success',
          'bg-warning-400 hover:bg-warning-400 active:bg-warning-500':
            colorType === 'warning',
          'bg-danger-400 hover:bg-danger-400 active:bg-danger-500':
            colorType === 'danger',
        },
        isSmall ? 'py-1' : 'py-2',
      ]"
    >
      <span
        :class="[
          'flex items-center justify-center font-medium',
          isDepressed && [
            colorType === 'primary' && 'text-primary-500',
            colorType === 'success' && 'text-success-500',
            colorType === 'warning' && 'text-warning',
            colorType === 'danger' && 'text-danger-500',
          ],
          type === 'muted' ? 'dark:text-white' : 'text-white',
          isSmall && 'text-sm',
        ]"
      >
        <span v-if="slots.icon" class="mr-2">
          <slot name="icon" />
        </span>
        <span
          v-if="slots.default"
          class="whitespace-nowrap"
          :class="loading && 'invisible relative'"
          v-bind="attrs"
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
      default: false,
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
