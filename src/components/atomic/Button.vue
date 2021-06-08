<template>
  <button
    :class="[
      'px-6 overflow-hidden rounded relative inline-block text-center',
      `transition-all border focus:ring ring-${colorType}-300 focus:outline-none`,
      `bg-${colorType} border-${colorType}`,
      `hover:bg-${colorType}-400 hover:border-${colorType}-400`,
      `active:bg-${colorType}-600 active:border-${colorType}-600`,

      isWide && 'w-full',
      isSmall ? 'py-0.5 text-sm' : 'py-1.5',
      isDepressed && [
        'bg-opacity-0 border-opacity-0 hover:bg-opacity-10 hover:border-opacity-10',
        'active:bg-opacity-20 active:border-opacity-20',
      ],
      {
        'text-white': !isDepressed && !isMuted,
        [`text-${colorType}`]: isDepressed,
      },
    ]"
    v-bind="$attrs"
  >
    <!--    <div-->
    <!--      :class="[-->
    <!--      'px-6 overflow-hidden rounded relative inline-block text-center',-->
    <!--      'transform transition-all border border-opacity-100',-->
    <!--      depressed && [-->
    <!--        '!bg-opacity-0 !border-opacity-10 hover:!bg-opacity-10 hover:!border-opacity-10',-->
    <!--        type ? `!text-${type}` : '!text-black dark:!text-white',-->
    <!--      ],-->
    <!--      isSmall ? 'py-0.5 text-sm' : 'py-1.5',-->
    <!--      !disabled-->
    <!--        ? 'focus:ring focus:outline-none'-->
    <!--        : [-->
    <!--            '!bg-gray-100 !border-opacity-0 !text-gray-400 focus:!ring-0 !transform-none !transition-none',-->
    <!--            'dark:!bg-blueGray-700 dark:!text-blueGray-900 pointer-events-none',-->
    <!--          ],-->
    <!--      (!type || type === 'muted') && [-->
    <!--        'ring-primary-300 focus:border-primary',-->
    <!--        'border-gray-300 dark:border-blueGray-600 hover:border-primary',-->
    <!--        'active:bg-gray-200 dark:active:bg-blueGray-700',-->
    <!--      ],-->
    <!--      type === 'primary' && [-->
    <!--        'focus:ring ring-primary-300 focus:border-primary-600',-->
    <!--        'bg-primary border-primary text-white',-->
    <!--        'hover:bg-primary-400 hover:border-primary-400 text-white',-->
    <!--        'active:bg-primary-600 active:border-primary-600',-->
    <!--      ],-->
    <!--      type === 'warning' && [-->
    <!--        'focus:ring ring-warning-300 focus:border-warning-600',-->
    <!--        'bg-warning border-warning text-white',-->
    <!--        'hover:bg-warning-400 hover:border-warning-400 text-white',-->
    <!--        'active:bg-warning-600 active:border-warning-600',-->
    <!--      ],-->
    <!--      type === 'danger' && [-->
    <!--        'ring-danger-300 focus:border-danger-600',-->
    <!--        'bg-danger border-danger text-white',-->
    <!--        'hover:bg-danger-400 hover:border-danger-400 text-white',-->
    <!--        'active:bg-danger-600 active:border-danger-600',-->
    <!--      ],-->
    <!--      type === 'success' && [-->
    <!--        'ring-success-300 focus:border-success-600',-->
    <!--        'bg-success border-success text-white',-->
    <!--        'hover:bg-success-400 hover:border-success-400 text-white',-->
    <!--        'active:bg-success-600 active:border-success-600',-->
    <!--      ],-->
    <!--    ]"-->
    <!--    ></div>-->
    <span class="flex items-center justify-center">
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
