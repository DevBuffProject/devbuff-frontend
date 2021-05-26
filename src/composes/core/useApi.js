import axios from 'axios'
import { useCookies } from '@vueuse/integrations'
import { set } from '@vueuse/core'
import { ref, shallowRef } from 'vue'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const cookies = useCookies()
const createAxios = (config) => {
  const baseURL = `${BASE_URL}`
  const axiosInstance = axios.create({ baseURL, ...config })
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = cookies.get('access_token')
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  })
  return axiosInstance
}

export const useApi = (config = {}) => {
  const isLoading = ref(false)
  const error = shallowRef()
  const axiosInstance = createAxios(config)
  const request = async (...args) => {
    set(isLoading, true)
    return await axiosInstance(...args)
      .then((response) => {
        set(error, false)
        return response
      })
      .catch((err) => set(error, err))
      .finally(() => set(isLoading, false))
  }

  return {
    BASE_URL,
    isLoading,
    error,
    request,
  }
}
