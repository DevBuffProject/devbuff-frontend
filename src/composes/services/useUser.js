import { useApi } from './useApi'
import { isReactive, isRef, ref, shallowRef, toRef, unref } from 'vue'
import { get } from '@vueuse/core'

export const useUser = () => {
  const user = ref({})
  const { request, BASE_URL, error, ...rest } = useApi()

  const getUser = async (uuid = '') => {
    const response = await request(uuid ? `/profile/${uuid}` : '/profile')
    user.value = {
      // TODO: Backend: response with avatar url
      avatar: getUserProfileUrl(response?.data.id),
      ...response?.data,
    }
    return rest
  }

  const getUserProfileUrl = (uuid) => `${BASE_URL}/photo/profile/${uuid}`

  return {
    user,
    getUser,
    getUserProfileUrl,
  }
}
