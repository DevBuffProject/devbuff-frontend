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
    console.log(accessToken)
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  })
  return axiosInstance
}

export const useApi = (config = {}) => {
  const uploadProgress = ref(0)
  const isLoading = ref(false)
  const error = shallowRef()
  const axiosInstance = createAxios(config)

  const permanentConfig = {
    onUploadProgress: (event) =>
      set(uploadProgress, (event.loaded / event.total) * 100),
  }

  const request = async (target, config) => {
    set(isLoading, true)
    return await axiosInstance(target, { ...config, ...permanentConfig })
      .then((response) => {
        set(error, false)
        return response
      })
      .catch((err) => set(error, err))
      .finally(() => {
        set(isLoading, false)
        set(uploadProgress, 0)
      })
  }

  return {
    BASE_URL,
    uploadProgress,
    isLoading,
    error,
    request,
  }
}
