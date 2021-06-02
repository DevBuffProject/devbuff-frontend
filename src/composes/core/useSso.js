import { useApi } from './useApi'

const { request } = useApi()

export const useSso = () => {
  const getSsoData = async () => {
    const response = await request('comment/sso')
    return response.data
  }

  return {
    getSsoData,
  }
}
