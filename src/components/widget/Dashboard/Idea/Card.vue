<template>
  <div
    class="px-4 transition-colors hover:bg-gray-50 dark:hover:bg-blueGray-900"
    v-bind="attrs"
  >
    <div class="py-4">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-xs text-gray-400 dark:text-blueGray-400">
            {{ date }}
          </div>
          <div class="flex items-center">
            <div class="text-primary">{{ title }}</div>

            <div class="flex items-center ml-4">
              <ClockIcon v-if="waitingValidation" class="text-warning w-5" />
              <CheckIcon v-else class="text-success w-5" />
              <em
                class="
                  ml-1
                  opacity-50
                  text-xs text-gray-500
                  dark:text-blueGray-400
                "
              >
                {{ waitingValidation ? 'wait' : 'approve' }}
              </em>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="opacity-50 hover:opacity-100 cursor-pointer p-3">
            <TrashIcon class="text-sm text-danger" />
          </div>

          <div class="opacity-50 hover:opacity-100 cursor-pointer p-3">
            <EditIcon class="text-sm text-primary" />
          </div>
        </div>
      </div>
      <div class="mt-2">{{ description }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from 'vue'

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
  setup() {
    const { attrs } = useContext()
    return { attrs }
  },
})
</script>
