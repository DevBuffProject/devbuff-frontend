<template>
  <div>
    <portal-target
      v-if="portal"
      slim
      :name="portal"
      :slot-props="{ isNotify: true }"
    />
    <div
      v-else
      :class="[
        'rounded-md max-w-[400px] p-4',
        'bg-white dark:bg-blueGray-800 overflow-hidden shadow-2xl',
      ]"
    >
      <div class="flex items-start">
        <div
          :class="[
            'p-2 mr-4 rounded-full bg-opacity-10',
            {
              'bg-primary text-primary-600': type === 'info',
              'bg-danger text-danger-600': type === 'danger',
              'bg-warning text-warning-600': type === 'warn',
              'bg-success text-success-600': type === 'success',
            },
          ]"
        >
          <svg-icon name="outline/exclamation" />
        </div>
        <div class="dark:text-white">
          <div class="text-sm font-semibold mb-2">{{ title }}</div>
          <div class="text-xs">{{ text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VNotification',
  props: {
    type: {
      type: String,
      default: 'info',
      validate: (v) => ['info', 'warn', 'danger', 'success'].includes(v),
    },
    portal: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
}
</script>
