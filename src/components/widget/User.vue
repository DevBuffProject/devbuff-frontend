<template>
  <div
    class="flex items-center"
    v-bind="attrs"
  >
    <atomic-avatar
      v-if="avatar"
      :gradient-border="avatarGradientBorder"
      :avatar="avatar"
      class="mr-2"
    />
    <div>
      <div class="font-semibold">
        {{ firstname }} {{ lastname }}
      </div>
      <div class="text-xs text-gray-500 dark:text-blueGray-400">
        {{ `@${username}` }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WidgetUser',
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
  setup(_, ctx) {
    const { attrs } = ctx
    return { attrs }
  },
})
</script>
