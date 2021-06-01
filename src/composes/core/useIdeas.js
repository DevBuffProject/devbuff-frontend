import { ref } from 'vue'
import { useApi } from './useApi'

export const useIdeas = () => {
  const { request, ...rest } = useApi()

  const idea = ref({})
  const getIdea = async (uuid) => {
    const response = await request(`idea/${uuid}`)
    idea.value = response.data
    return response
  }

  const ideas = ref([])
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

  const userIdeas = ref([])
  const getUserIdeas = async () => {
    const response = await request('/idea/self')
    userIdeas.value = response.data
    return response
  }

  return {
    idea,
    ideas,
    userIdeas,
    getIdea,
    getIdeas,
    getUserIdeas,
    ...rest,
  }
}
