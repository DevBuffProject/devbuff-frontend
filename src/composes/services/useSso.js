import { useApi } from './useApi'
import { ref } from 'vue'

const { request } = useApi()
const ssoData = ref({})

export const useSso = () => {
  const getSsoData = async () => {
    const response = await request('comment/sso')
    ssoData.value = response.data
    return response.data
  }

  return {
    ssoData,
    getSsoData,
  }
}
