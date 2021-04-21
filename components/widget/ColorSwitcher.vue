<template>
  <div
    :class="[
      'px-4 py-2 rounded-full relative',
      'border-gray-300 dark:border-blueGray-600 dark:bg-blueGray-700',
    ]"
    style="border-width: 3px"
    @click="toggleDarkMode"
  >
    <div
      :class="[
        'p-0.5 absolute top-1/2 rounded-full bg-blueGray-700 dark:bg-blueGray-600 text-sm',
        'transform -translate-y-1/2 text-purple-500 dark:text-yellow-500',
        'border-2 border-white dark:border-blueGray-800',
        isLightMode ? '-right-1/3' : '-left-1/3',
      ]"
    >
      <atomic-material-icon
        type="round"
        :name="isLightMode ? 'mode_night' : 'light_mode'"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VColorModeSwitcher',
  computed: {
    isLightMode() {
      return this.$colorMode.preference === 'light'
    },
  },
  methods: {
    toggleDarkMode() {
      this.$colorMode.preference =
        this.$colorMode.preference === 'dark' ? 'light' : 'dark'
    },
  },
}
</script>
