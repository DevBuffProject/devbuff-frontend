<template>
  <div class="flex items-center">
    <atomic-avatar
      v-if="avatar !== null"
      :gradient-border="avatarGradientBorder"
      :avatar="avatar"
      class="mr-2"
    />
    <div>
      <nuxt-link
        v-if="userId !== null"
        :to="localePath({ name: 's-profile-id', params: { id: userId } })"
        class="font-semibold"
      >
        {{ firstname }} {{ lastname }}
      </nuxt-link>
      <div v-else class="font-semibold">{{ firstname }} {{ lastname }}</div>
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
    userId: {
      type: String,
      default: null,
    },
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
