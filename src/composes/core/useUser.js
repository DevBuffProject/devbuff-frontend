import { useApi } from './useApi'
import { ref } from 'vue'

const { request, BASE_URL } = useApi()
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

  const saveUserSkills = async (skills) => {
    await request('/profile', {
      method: 'patch',
      data: {
        skills,
      },
    })

    user.value.skills = skills
  }

  const saveUserData = async (data) => {
    await request('/profile', {
      method: 'patch',
      data: data,
    })

    for (const indexValue of Object.keys(data)) {
      user.value[indexValue] = data[indexValue]
    }
  }

  const confirmEmail = async (token) => {
    try {
      await request(`/email/confirm?token=${token}`)
    } catch (error) {
      if (error.value && error.value.response.status !== 200)
        throw new Error("Can't confirm email")
    }
  }

  return {
    user,
    getUser,
    getUserProfileUrl,
    saveUserSkills,
    saveUserData,
    confirmEmail,
  }
}
