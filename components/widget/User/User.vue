<template>
  <div class="flex items-center">
    <atomic-avatar
      :gradient-border="avatarGradientBorder"
      :avatar="avatar"
      class="mr-2"
    />
    <div>
      <div class="font-semibold">{{ firstname }} {{ lastname }}</div>
      <div class="text-xs text-gray-500 dark:text-blueGray-400">
        @{{ username }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VUser',
  props: {
    avatarGradientBorder: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    firstname: {
      type: String,
      default: null,
    },
    lastname: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
  },
}
</script>
