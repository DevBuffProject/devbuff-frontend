<template>
  <AtomicDropdown
    :by-click="true"
    @onClose="onCloseNotificationDialog"
    @onOpen="onOpenNotificationDialog"
  >
    <template #activator>
      <div role="button" v-focusable>
        <component :is="BellIcon" />
        <div class="absolute top-[-10px] left-[25px]">
          {{ countUnreadNotifications }}
        </div>
      </div>
    </template>

    <div
      class="
        grid grid-cols-5
        overflow-y-auto
        scrollbar-w-2
        scrollbar-track-gray-lighter
        scrollbar-thumb-rounded
        scrollbar-thumb-gray
        scrolling-touch
        w-[400px]
        max-w-[280px]
      "
      style="width: 400px; max-height: 280px"
    >
      <div
        v-if="isLoading"
        class="col-start-3 flex items-center justify-center"
      >
        <AtomicLoadingBar v-if="isLoading" class="text-primary" />
      </div>
      <div
        v-else-if="notifications"
        class="
          col-span-5
          border-b
          dark:border-blueGray-700
          grid grid-cols-12
          pb-1
          pt-1
        "
        v-for="(notification, index) of notifications"
        :key="index"
      >
        <div class="col-span-1">
          <component
            v-if="notification.type === 'USER_PENDING'"
            :is="UserPlusIcon"
          />

          <component
            v-if="notification.type === 'CONFIRM_EMAIL'"
            :is="SendIcon"
          />
        </div>

        <div class="col-span-11" v-if="notification.type === 'USER_PENDING'">
          У вас новый кандидат в команду «{{ notification.data.ideaName }}»,
          <RouterLink
            :to="{
              name: 'idea-detail',
              params: { id: notification.data.ideaId, _isDialog: true },
            }"
            custom
            v-slot="{ href, navigate }"
          >
            <a
              :href="href"
              @click="navigate"
              v-focusable
              class="font-semibold inline-block"
            >
              открыть
            </a>
          </RouterLink>
        </div>
        <div class="col-span-11" v-if="notification.type === 'CONFIRM_EMAIL'">
          Мы отправили вам письмо для подтверждения
        </div>
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
import { BellIcon, UserPlusIcon, SendIcon } from '@iconicicons/vue3'

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
      countUnreadNotifications,
      notifications,
      onOpenNotificationDialog,
      onCloseNotificationDialog,
    }
  },
})
</script>
