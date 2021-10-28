import axios from 'axios'
import { useCookies } from '@vueuse/integrations'
import { ref, shallowRef } from 'vue'
import { progress } from '../../core/ui/LoadingIndicator'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const cookies = useCookies()

const loadingQueue = []
const createAxios = (config) => {
  const baseURL = `${BASE_URL}`
  const axiosInstance = axios.create({ baseURL, ...config })

  axiosInstance.interceptors.request.use((config) => {
    loadingQueue.push(config.url)
    if (config.indicator !== false) progress.start()

    const accessToken = cookies.get('access_token')
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  })

  axiosInstance.interceptors.response.use((config) => {
    loadingQueue.splice(loadingQueue.findIndex((url) => config.url === url))
    if (config.indicator !== false) progress.done()
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
      uploadTotal.value = event.total
      uploadLoaded.value = event.loaded
      uploadProgress.value = (event.loaded / event.total) * 100
    },
  }

  const request = async (target, config) => {
    isLoading.value = true
    return await axiosInstance(target, { ...config, ...permanentConfig })
      .then((response) => {
        error.value = false
        return response
      })
      .catch((err) => (error.value = err))
      .finally(() => {
        isLoading.value = false
        uploadProgress.value = 0
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
