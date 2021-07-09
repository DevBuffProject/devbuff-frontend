<template>
  <AtomicDropdown
    @close="onClose"
    @open="onOpen"
  >
    <template #activator="{ isVisible }">
      <div
        role="button"
        class="py-4 px-4 hover:bg-gray-100 group transition-opacity"
        :class="{ 'bg-gray-100 opacity-100': isVisible }"
      >
        <AtomicBadge
          :value="countUnreadNotifications > 0 && countUnreadNotifications"
        >
          <BellIcon
            class="w-[30px] h-[30px] opacity-70 group-hover:opacity-100"
            :class="{ 'opacity-100': isVisible }"
          />
        </AtomicBadge>
      </div>
    </template>

    <div class="-m-4">
      <div class="py-2 px-6 border-b">
        Уведомления
      </div>

      <div
        class="overflow-y-auto w-[400px] h-[300px]"
        ref="container"
      >
        <div
          v-if="isLoading"
          class="h-full w-full flex items-center justify-center"
        >
          <AtomicLoadingSpinner class="text-primary" />
        </div>

        <div
          v-else-if="notifications"
          class="divide-y dark:border-blueGray-700"
        >
          <div
            v-for="(notification, index) of notifications"
            :key="index"
            class="hover:bg-gray-50 text-sm flex px-4 py-2 min-h-[50px]"
            :class="{ 'bg-primary-50': !notification.read }"
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
              <div
                class="group block cursor-pointer"
                @click="navigate"
              >
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
              <div
                class="group cursor-pointer"
                @click="navigate"
              >
                Ваша идея
                <em class="text-primary-600 group-hover:underline">
                  {{ notification.data.ideaName }} </em>, была одобрена
              </div>
            </RouterLink>
          </div>

          <div
            class="
            text-primary text-center
            hover:underline hover:bg-primary-100 hover:bg-opacity-20
            cursor-pointer
            py-4
          "
            @click="more"
          >
            Еще
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
    </div>
  </AtomicDropdown>
</template>

<script>
import { defineComponent, ref, onBeforeUnmount } from 'vue'
import { useUser } from '../../../composes/core'

export default defineComponent({
  name: 'WidgetUserNotification',
  setup() {
    const {
      notifications,
      countUnreadNotifications,
      getCountUnreadNotifications,
      getNotifications,
      isLoading,
    } = useUser()
    const container = ref()
    let currentPage = 1

    const onOpen = async () => await getNotifications(1)
    const onClose = () => (notifications.value = [])
    const more = async () => {
      const scrollTop = container.value.scrollTop
      await getNotifications(++currentPage)
      container.value.scrollTop = scrollTop
    }

    getCountUnreadNotifications()

    const interval = setInterval(getCountUnreadNotifications, 30000)
    onBeforeUnmount(() => clearInterval(interval))

    return {
      isLoading,
      countUnreadNotifications,
      notifications,
      container,
      currentPage,
      more,
      onOpen,
      onClose,
    }
  },
})
</script>
