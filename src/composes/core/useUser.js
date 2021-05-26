import { useApi } from './useApi'
import { ref } from 'vue'

const { request, BASE_URL } = useApi()
const user = ref({})

export const useUser = () => {
  const getUser = async (uuid = '') => {
    const response = await request(uuid ? `/profile/${uuid}` : '/profile')
    user.value = {
      avatar: `${BASE_URL}/photo/profile/${response.data.id}`,
      ...response.data,
    }
    return response
  }

  return {
    user,
    getUser,
  }
}
