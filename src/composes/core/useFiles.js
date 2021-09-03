import { useApi } from './useApi'

export const useFiles = () => {
  const { request, ...rest } = useApi()

  const uploadUserPhoto = async (file) => {
    const data = new FormData()
    data.append('image', file, file.fileName)
    return await request('photo/profile', { method: 'put', data })
  }

  const uploadUserImage = async (file) => {
    const data = new FormData()
    data.append('image', file, file.fileName)
    return await request('image', { method: 'post', data })
  }

  return { uploadUserPhoto, uploadUserImage, ...rest }
}
