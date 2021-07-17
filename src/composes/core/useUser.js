// TODO: rename as useProfile

import { useApi } from './useApi'
import { ref } from 'vue'

const user = ref({})

export const useUser = () => {
  const { request, BASE_URL, error, ...rest } = useApi()

  const getUser = async (uuid = '') => {
    const response = await request(uuid ? `/profile/${uuid}` : '/profile')
    user.value = {
      // TODO: Backend: response with avatar url
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
    // If data stored on server are conflicted with sent
    // TODO: check for error triggered on code less than 300
    if (error.value?.response?.status === 409)
      throw new Error(error.value.response.data)
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
    resendEmail,
    ...rest,
  }
}
