<template>
  <div class="flex grow items-center" v-bind="attrs">
    <AtomicAvatar v-if="user.avatar" :src="user.avatar" />
    <AtomicSkeleton v-else class="w-[40px] h-[40px]" />
    <div class="ml-2 flex-1">
      <div v-if="user.firstName || user.lastName" class="font-semibold">
        {{ user.firstName }} {{ user.lastName }}
      </div>
      <AtomicSkeleton v-else />
      <div
        v-if="!!user.userName"
        class="text-xs text-gray-400 dark:text-dark-100"
      >
        {{ `@${user.userName}` }}
      </div>
      <AtomicSkeleton v-else class="h-[14px] w-1/2" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, useAttrs } from 'vue'
const props = defineProps({
  user: { type: Object, default: null },
})
const { user } = toRefs(props)
const attrs = useAttrs()
</script>
