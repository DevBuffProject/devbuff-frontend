<template>
  <div
    class="px-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-blueGray-900"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="py-4">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-xs text-gray-400 dark:text-blueGray-400">
            {{ date }}
          </div>
          <div class="flex items-center">
            <div class="text-primary">{{ title }}</div>

            <div
              class="text-xs text-gray-500 dark:text-blueGray-400 flex items-center"
            >
              <atomic-material-icon
                :name="!waitingValidation ? 'done' : 'hourglass_empty'"
                :class="[
                  waitingValidation ? 'text-warning' : 'text-success',
                  'text-xs',
                ]"
              />
              <em class="opacity-50">
                {{
                  waitingValidation
                    ? $t('page.ideas.view.statusModeration.waitingValidation')
                    : $t('page.ideas.view.statusModeration.alreadyApproved')
                }}
              </em>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="opacity-50 hover:opacity-100 cursor-pointer p-3">
            <svg-icon name="outline/trash" class="text-sm text-danger" />
          </div>

          <div class="opacity-50 hover:opacity-100 cursor-pointer p-3">
            <svg-icon name="outline/pencil-alt" class="text-sm text-primary" />
          </div>
        </div>
      </div>
      <div class="mt-2">{{ description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetDashboardIdea',
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
}
</script>
