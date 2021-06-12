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

    if (error.value?.response?.status === 409) {
      //conflict data
      throw new Error(error.value.response.data)
    }

    if (data.email !== user.value.email) {
      user.value.statusEmailConfirm = false
    }

    for (const indexValue of Object.keys(data)) {
      user.value[indexValue] = data[indexValue]
    }
  }

  const confirmEmail = async (token) => {
    await request(`/email/confirm?token=${token}`)

    if (error.value?.response?.status !== undefined)
      throw new Error("Can't confirm email")
  }

  const resendEmail = async () => {
    await request('/profile/resendEmail', {
      method: 'post',
    })
  }

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
