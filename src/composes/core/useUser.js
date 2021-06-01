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

  const joinToIdea = async (uuidIdea, uuidSpecialist) => {
    await request('/idea/join/' + uuidIdea + '/' + uuidSpecialist, {
      method: 'put',
    })
  }

  const getStatusPositions = async (uuidIdea) => {
    const { data } = await request('/idea/' + uuidIdea + '/statusPositions')
    return data
  }

  return {
    user,
    getUser,
    getUserProfileUrl,
    joinToIdea,
    getStatusPositions,
  }
}
