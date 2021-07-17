<template>
  <div
    class="px-4 transition-colors hover:bg-gray-50 dark:hover:bg-blueGray-900"
    v-bind="attrs"
  >
    <div class="py-4">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-xs text-gray-400 dark:text-blueGray-400">
            {{ dateString }}
          </div>
          <div class="flex items-center">
            <div class="text-primary-500">
              {{ title }}
            </div>

            <div class="flex items-center ml-4">
              <ClockIcon v-if="waitingValidation" class="text-warning w-5" />
              <CheckIcon v-else class="text-success-500 w-5" />
              <em
                class="
                  ml-1
                  opacity-50
                  text-xs text-gray-500
                  dark:text-blueGray-400
                "
              >
                {{ waitingValidation ? t('waiting') : t('approved') }}
              </em>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-2">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useAttrs, useSlots } from 'vue'
import { useI18n } from '../../../../composes/utils'

export default defineComponent({
  name: 'WidgetDashboardIdeaCard',
  props: {
    date: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    waitingValidation: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const attrs = useAttrs()
    const { t } = useI18n('components.widget.dashboard.idea.card')

    return {
      t,
      dateString: [
        new Date(props.date).toLocaleTimeString(),
        new Date(props.date).toLocaleDateString(),
      ].join(' '),
      attrs,
    }
  },
})
</script>
