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
  let _uploadCallback = () => {}
  const onUpload = (callback) => (_uploadCallback = callback)
  const uploadProgress = ref(0)
  const uploadTotal = ref(0)
  const uploadLoaded = ref(0)
  const isLoading = ref(false)
  const error = shallowRef()
  const axiosInstance = createAxios(config)

  const permanentConfig = {
    onUploadProgress: (event) => {
      _uploadCallback(event)
      console.log(_uploadCallback)
      set(uploadTotal, event.total)
      set(uploadLoaded, event.loaded)
      set(uploadProgress, (event.loaded / event.total) * 100)
    },
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
    uploadTotal,
    uploadLoaded,
    isLoading,
    error,
    request,
    onUpload,
  }
}
