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

  const pendingUsers = ref(undefined)
  const getPendingUsers = async (uuid) => {
    const response = await request(`/idea/pending/${uuid}`)
    pendingUsers.value = response.data
    return response
  }

  const statusPositions = ref([])
  const getStatusPositions = async (uuid) => {
    const { data } = await request(`/idea/${uuid}/statusPositions`)
    statusPositions.value = data
    return data
  }

  const joinToIdea = async (uuidIdea, uuidSpecialist) => {
    await request('/idea/join/' + uuidIdea + '/' + uuidSpecialist, {
      method: 'put',
    })
  }

  const changeStatusIdea = async (status) => {
    await request(`/idea/${uuid}/status`, {
      method: 'PATCH',
      data: {
        status: status,
      },
    })
  }

  const approveUser = async (uuidIdea, uuidSpecialisation, uuidUser) => {
    await request(
      `/idea/approve/${uuidIdea}/${uuidSpecialisation}/${uuidUser}`,
      {
        method: 'PUT',
      },
    )
  }

  return {
    idea,
    publishedAgo,
    pendingUsers,
    statusPositions,
    getIdea,
    getPendingUsers,
    getStatusPositions,
    joinToIdea,
    changeStatusIdea,
    approveUser,
    ...rest,
  }
}
