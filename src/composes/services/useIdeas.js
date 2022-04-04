import { ref } from 'vue'
import { useApi } from './useApi'

export const useIdeas = () => {
  const { request, ...rest } = useApi()

  const idea = ref({})
  const getIdea = async (uuid) => {
    const response = await request(`ideas/${uuid}`)
    idea.value = response.data
    return response
  }

  const ideas = ref([])
  const getIdeas = async (params) => {
    const finalParams = { page: params.page, sortBy: 'date', ...params }
    const query = new URLSearchParams()
    Object.keys(finalParams).forEach((param) =>
      query.append(param, finalParams[param]),
    )
    const response = await request(`/ideas/?${query}`, { method: 'get' })
    ideas.value = response.data
    return response
  }

  const userIdeas = ref([])
  const getUserIdeas = async (UUID) => {
    userIdeas.value = []
    const response = await request(UUID ? `/ideas/user/${UUID}` : '/idea/self')
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
