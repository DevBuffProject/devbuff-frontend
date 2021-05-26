import { ref } from 'vue'
import { useApi } from './useApi'
import { set, useTimeAgo } from '@vueuse/core'

export const useIdea = (uuid) => {
  const { request, ...rest } = useApi('ideas')

  const idea = ref({})
  const publishedAgo = useTimeAgo(new Date(idea.value.lastUpdateDate))
  const getIdea = async () => {
    const { data } = await request(`idea/${uuid}`)
    set(idea, data)
    return data
  }

  return {
    idea,
    publishedAgo,
    getIdea,
    ...rest,
  }
}
