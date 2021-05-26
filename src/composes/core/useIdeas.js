import { ref } from 'vue'
import { useApi } from './useApi'

export const useIdeas = () => {
  const { request, ...rest } = useApi()
  const idea = ref({})
  const ideas = ref([])
  const userIdeas = ref([])
  const pendingUsers = ref([])

  const getIdea = async (uuid) => {
    const response = await request(`idea/${uuid}`)
    idea.value = response.data
    return response
  }
  const getIdeas = async (params) => {
    const finalParams = { page: 1, sortBy: 'date', ...params }
    const query = new URLSearchParams()
    Object.keys(finalParams).forEach((param) =>
      query.append(param, finalParams[param]),
    )
    const response = await request(`/idea/?${query}`, { method: 'get' })
    ideas.value = response.data
    return response
  }
  const getUserIdeas = async () => {
    const response = await request('/idea/self')
    userIdeas.value = response.data
    return response
  }
  const getPendingUsers = async (uuid) => {
    const response = await request(`/idea/pending/${uuid}`)
    pendingUsers.value = response.data
    return response
  }

  return {
    idea,
    ideas,
    userIdeas,
    pendingUsers,
    getIdea,
    getIdeas,
    getUserIdeas,
    getPendingUsers,
    ...rest,
  }
}
