import { useApi } from './useApi'
import { ref } from 'vue'

const { request, BASE_URL, error } = useApi()
const user = ref({})

export const useUser = () => {
  const getUser = async (uuid = '') => {
    const response = await request(uuid ? `/profile/${uuid}` : '/profile')
    user.value = {
      avatar: getUserProfileUrl(response?.data.id),
      ...response?.data,
    }
    return response
  }
  const getUserProfileUrl = (uuid) => `${BASE_URL}/photo/profile/${uuid}`

  const saveUserSkills = async (data) => {
    const response = await request('/profile', { method: 'patch', data })
    user.value.skills = data
    return response
  }

  const saveUserData = async (data) => {
    const response = await request('/profile', { method: 'patch', data })
    //conflict data
    if (error.value?.response?.status === 409)
      throw new Error(error.value.response.data)
    return response
  }

  const confirmEmail = async (token) => {
    const response = await request(`/email/confirm?token=${token}`)
    if (error.value?.response?.status !== undefined)
      throw new Error("Can't confirm email")

    return response
  }

  const resendEmail = async () =>
    await request('/profile/resendEmail', { method: 'post' })

  return {
    user,
    getUser,
    getUserProfileUrl,
    saveUserSkills,
    saveUserData,
    confirmEmail,
    resendEmail,
  }
}
