<template>
  <AtomicDropdown @open="onOpen">
    <template #activator="{ isVisible }">
      <div
        role="button"
        class="
          hover:bg-gray-100
          dark:hover:bg-dark-900
          py-4
          px-4
          group
          transition-opacity
        "
        :class="{
          'bg-gray-100 dark:bg-dark-900 text-primary-500': isVisible,
        }"
      >
        <AtomicBadge
          :value="
            countUnreadNotifications > 0 ? countUnreadNotifications : null
          "
        >
          <BellIcon
            class="w-[30px] h-[30px] opacity-70 group-hover:opacity-100"
            :class="{ 'opacity-100': isVisible }"
          />
        </AtomicBadge>
      </div>
    </template>

    <div class="-m-4">
      <div class="py-3 px-6 border-b border-gray-200 dark:border-dark-900">
        Уведомления
      </div>
      <div
        class="overflow-y-auto w-[400px] h-[400px] scrollbar"
        ref="container"
      >
        <div
          v-if="isLoading && !notifications"
          class="h-full w-full flex items-center justify-center"
        >
          <AtomicLoadingSpinner class="text-primary-500" />
        </div>

        <AtomicList v-if="notifications">
          <div v-for="(notify, index) of notifications" :key="index">
            <RouterLink
              v-if="notify.type === 'USER_PENDING'"
              :to="{
                name: 'dashboard',
                query: { ideaId: notify.data.ideaId },
              }"
              custom
              v-slot="{ navigate }"
            >
              <AtomicCardNotification
                :date="timeAgo(notify.dateCreation)"
                type="primary"
                @click="navigate"
                class="cursor-pointer"
                :class="{
                  'bg-primary-100 bg-opacity dark:bg-dark-900': !notify.read,
                }"
              >
                <template #icon>
                  <UserPlusIcon />
                </template>

                У вас новый кандидат в команду
                <em class="text-primary-700 group-hover:underline">
                  {{ notify.data.ideaName }}
                </em>
              </AtomicCardNotification>
            </RouterLink>
            <RouterLink
              v-if="notify.type === 'IDEA_APPROVED'"
              :to="{
                name: 'idea-detail',
                params: { id: notify.data.ideaId, _isDialog: true },
              }"
              custom
              v-slot="{ navigate }"
            >
              <AtomicCardNotification
                :date="timeAgo(notify.dateCreation)"
                type="success"
                class="cursor-pointer"
                :class="{
                  'bg-primary-100 bg-opacity dark:bg-dark-900': !notify.read,
                }"
                @click="navigate"
              >
                <template #icon>
                  <CheckIcon />
                </template>

                Ваша идея
                <em class="text-primary-600 group-hover:underline">
                  {{ notify.data.ideaName }}
                </em>
                {{ ', ' }} была одобрена
              </AtomicCardNotification>
            </RouterLink>
            <RouterLink
              v-if="notify.type === 'IDEA_DENIED'"
              :to="{
                name: 'idea-detail',
                params: { id: notify.data.ideaId, _isDialog: true },
              }"
              custom
              v-slot="{ navigate }"
            >
              <AtomicCardNotification
                :date="timeAgo(notify.dateCreation)"
                type="danger"
                class="cursor-pointer"
                :class="{
                  'bg-primary-100 bg-opacity dark:bg-dark-900': !notify.read,
                }"
                @click="navigate"
              >
                <template #icon>
                  <EditIcon />
                </template>

                Ваша идея
                <em class="text-primary-600 group-hover:underline">
                  {{ notify.data.ideaName }}
                </em>
                {{ ', ' }} нуждается в доработке
              </AtomicCardNotification>
            </RouterLink>
            <AtomicCardNotification
              v-if="notify.type === 'CONFIRM_EMAIL'"
              :date="timeAgo(notify.dateCreation)"
              :class="{
                'bg-primary-100 bg-opacity dark:bg-dark-900': !notify.read,
              }"
            >
              <template #icon>
                <MailIcon />
              </template>

              Мы отправили вам письмо для подтверждения
            </AtomicCardNotification>
          </div>

          <div
            v-if="!endOfNotifications"
            class="
              text-primary-500 text-center
              hover:underline
              cursor-pointer
              py-4
            "
            @click="more"
          >
            Еще
          </div>
          <div v-else class="text-center py-4">
            <span class="text-2xl mr-2">🤷</span>
            <span class="opacity-50"> Это пока все </span>
          </div>
        </AtomicList>

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
import { useNotifications } from '../../../composes/services'
import { useTimeAgo } from '@vueuse/core'

export default defineComponent({
  name: 'WidgetUserNotification',
  setup() {
    const {
      notifications,
      countUnreadNotifications,
      getCountUnreadNotifications,
      getNotifications,
      isLoading,
    } = useNotifications()
    const container = ref()
    const endOfNotifications = ref(false)
    let currentPage = 1

    const onOpen = async () => {
      if (!notifications.value.length) {
        await getNotifications(1)
        currentPage = 1
      }
    }
    const more = async () => {
      const scrollTop = container.value.scrollTop
      const { data } = await getNotifications(++currentPage)
      container.value.scrollTop = scrollTop

      if (data.notifications.length < 10) endOfNotifications.value = true
    }
    const timeAgo = (time) => useTimeAgo(new Date(time)).value

    getCountUnreadNotifications()

    const interval = setInterval(getCountUnreadNotifications, 30000)
    onBeforeUnmount(() => clearInterval(interval))

    return {
      isLoading,
      countUnreadNotifications,
      notifications,
      container,
      currentPage,
      endOfNotifications,
      more,
      onOpen,
      timeAgo,
    }
  },
})
</script>
