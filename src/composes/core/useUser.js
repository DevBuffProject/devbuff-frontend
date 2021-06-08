import { useApi } from './useApi'
import { ref } from 'vue'

const { request, BASE_URL, error } = useApi()
const user = ref({})

export const useUser = () => {
  const getUser = async (uuid = '') => {
    const response = await request(uuid ? `/profile/${uuid}` : '/profile')
    user.value = {
      avatar: getUserProfileUrl(response.data.id),
      ...response.data,
    }
    return response
  }

  const getUserProfileUrl = (uuid) => {
    return `${BASE_URL}/photo/profile/${uuid}`
  }

  const confirmEmail = async (token) => {
    await request(`/email/confirm?token=${token}`)
    if (error.value && error.value.response.status !== 200) {
      throw new Error("Can't confirm email")
    }
  }

  return {
    user,
    getUser,
    getUserProfileUrl,
    confirmEmail,
  }
}
