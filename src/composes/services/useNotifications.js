import { useApi } from './useApi'
import { ref } from 'vue'

const countUnreadNotifications = ref(0)
const notifications = ref([])

export const useNotifications = () => {
  const { request, error, ...rest } = useApi()

  const getCountUnreadNotifications = async () => {
    const response = await request(`/notifications/unread`, {
      indicator: false,
    })
    countUnreadNotifications.value = response.data.count
    return countUnreadNotifications.value
  }

  const getNotifications = async (page) => {
    const response = await request(`/notifications?page=${page}`, {
      indicator: false,
    })
    notifications.value = notifications.value.concat(
      response.data.notifications,
    )
    countUnreadNotifications.value = response.data.countUnread
    return response
  }

  const confirmEmail = async (token) => {
    const response = await request(
      `/notifications/email/confirm?token=${token}`,
    )

    if (error.value?.response?.status !== undefined)
      throw new Error("Can't confirm email")
    return response
  }

  return {
    notifications,
    countUnreadNotifications,
    confirmEmail,
    getNotifications,
    getCountUnreadNotifications,
    ...rest,
  }
}
