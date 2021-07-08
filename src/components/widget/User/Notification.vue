<template>
  <AtomicDropdown
    :by-click="true"
    @close="onCloseNotificationDialog"
    @open="onOpenNotificationDialog"
  >
    <template #activator="{ isVisible }">
      <div
        role="button"
        :class="['py-5 px-4 hover:bg-gray-100', isVisible && 'bg-gray-100']"
      >
        <AtomicBadge :value="countUnreadNotifications">
          <BellIcon class="w-[30px] h-[30px]" />
        </AtomicBadge>
      </div>
    </template>

    <div class="-mx-4 overflow-y-auto w-[400px] max-h-[300px]">
      <AtomicLoading v-if="isLoading" class="text-primary" />

      <div
        v-else-if="notifications"
        class="
          border-b
          dark:border-blueGray-700
          hover:bg-gray-50
          text-sm
          flex
          px-4
          py-2
          min-h-[50px]
        "
        v-for="(notification, index) of notifications"
        :key="index"
      >
        <div class="mr-4 flex items-center justify-center">
          <UserPlusIcon
            v-if="notification.type === 'USER_PENDING'"
            class="p-1 w-[30px] h-[30px] bg-gray-200 rounded-full"
          />
          <MailIcon
            v-if="notification.type === 'CONFIRM_EMAIL'"
            class="
              p-1
              w-[30px]
              h-[30px]
              bg-primary-100
              text-primary
              rounded-full
            "
          />
          <UserCheckIcon
            v-if="notification.type === 'IDEA_APPROVED'"
            class="
              p-1
              w-[30px]
              h-[30px]
              bg-success-100
              text-success
              rounded-full
            "
          />
        </div>

        <RouterLink
          v-if="notification.type === 'USER_PENDING'"
          :to="{
            name: 'dashboard',
            query: { ideaId: notification.data.ideaId },
          }"
          custom
          v-slot="{ navigate }"
        >
          <div class="group block cursor-pointer" @click="navigate">
            У вас новый кандидат в команду
            <em class="text-primary-700 group-hover:underline">
              {{ notification.data.ideaName }}
            </em>
          </div>
        </RouterLink>

        <div v-if="notification.type === 'CONFIRM_EMAIL'">
          Мы отправили вам письмо для подтверждения
        </div>

        <RouterLink
          v-if="notification.type === 'IDEA_APPROVED'"
          :to="{
            name: 'idea-detail',
            params: { id: notification.data.ideaId, _isDialog: true },
          }"
          custom
          v-slot="{ navigate }"
        >
          <div class="group cursor-pointer" @click="navigate">
            Ваша идея
            <em class="text-primary-600 group-hover:underline">
              {{ notification.data.ideaName }} </em
            >, была одобрена
          </div>
        </RouterLink>
      </div>
      <div
        v-else
        class="
          col-start-2 col-span-3
          flex
          items-center
          justify-center
          w-full
          p-4
        "
      >
        У вас нет уведомлений
      </div>
    </div>
  </AtomicDropdown>
</template>

<script>
import { defineComponent, ref, onBeforeUnmount } from 'vue'
import { useUser } from '../../../composes/core'
import {
  BellIcon,
  UserPlusIcon,
  SendIcon,
  UserCheckIcon,
} from '@iconicicons/vue3'

export default defineComponent({
  name: 'WidgetUserNotification',
  setup() {
    const {
      notifications,
      countUnreadNotifications,
      getCountUnreadNotifications,
      getNotifications,
    } = useUser()
    const isLoading = ref(false)
    let currentPage = 1

    const onOpenNotificationDialog = async () => {
      isLoading.value = true
      await getNotifications(1)
      currentPage++
      isLoading.value = false
    }
    const onCloseNotificationDialog = () => (notifications.value = [])

    getCountUnreadNotifications()

    const interval = setInterval(getCountUnreadNotifications, 30000)
    onBeforeUnmount(() => clearInterval(interval))

    return {
      isLoading,
      BellIcon,
      UserPlusIcon,
      SendIcon,
      UserCheckIcon,
      countUnreadNotifications,
      notifications,
      onOpenNotificationDialog,
      onCloseNotificationDialog,
    }
  },
})
</script>
