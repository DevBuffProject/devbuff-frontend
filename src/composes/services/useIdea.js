import { ref } from 'vue'
import { useApi } from './useApi'
import { set, useTimeAgo } from '@vueuse/core'

const mapValuesFromArrayObjects = (object, key) => {
  const values = object.reduce((acc, o) => acc.concat(o[key]), [])
  return [...new Set(values)]
}

export const useIdea = (id) => {
  const { request, error, ...rest } = useApi('ideas')

  const idea = ref({})
  const publishedAgo = useTimeAgo(new Date(idea.value.lastUpdateDate))
  const getIdea = async (uuid = id) => {
    const { data } = await request(`ideas/${uuid}`)
    set(idea, data)
    return data
  }

  const pendingUsers = ref()
  const getPendingUsers = async (uuid = id) => {
    const response = await request(`/ideas/pending/${uuid}`)
    pendingUsers.value = response.data
    return response
  }

  const statusPositions = ref([])
  const getStatusPositions = async (uuid = id) => {
    const { data } = await request(`/ideas/${uuid}/statusPositions`)
    statusPositions.value = data
    return data
  }

  const joinToIdea = async (uuidIdea = id, uuidSpecialist) => {
    await request(`/ideas/join/${uuidIdea}/${uuidSpecialist}`, {
      method: 'put',
    })
  }
  const changeStatusIdea = async (uuid = id, status) => {
    await request(`/ideas/${uuid}/status`, {
      method: 'PATCH',
      data: { status: status },
    })

    if (status === 'ENABLE_SET_OF_CANDIDATES')
      idea.value.status = 'WAITING_FULL_TEAM'
    else if (status === 'DISABLE_SET_OF_CANDIDATES')
      idea.value.status = 'WORKING'

    getPendingUsers(uuid)
  }
  const approveUser = async (uuidIdea = id, uuidSpecialisation, uuidUser) => {
    await request(
      `/ideas/approve/${uuidIdea}/${uuidSpecialisation}/${uuidUser}`,
      { method: 'PUT' },
    )
  }

  const deleteIdea = async (uuid = id) => {
    await request(`/ideas/${uuid}`, {
      method: 'DELETE',
    })

    if (idea.value?.id === uuid) {
      idea.value = {}
    }
  }

  const publishIdea = async (data) => {
    const formData = new FormData()

    for (const key of Object.keys(data)) {
      formData.append(
        key,
        typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key],
      )
    }
    const response = await request(`/ideas/`, {
      method: 'POST',
      data: formData,
    })

    if (error.value?.response?.status === 429) throw new Error('tooManyIdeas')

    return response.data
  }

  const updateIdea = async (uuid, data) => {
    await request(`/ideas/${uuid}`, {
      method: 'PUT',
      data: data,
    })
  }

  const languagesForSpecialist = (specialistId) => {
    return idea.value.specialist
      .filter((specialist) => {
        return specialist.id === specialistId
      })
      .flatMap((specialist) => {
        return mapValuesFromArrayObjects(specialist.languages, 'name')
      })
  }

  const frameworksForSpecialist = (specialistId) => {
    return idea.value.specialist
      .filter((specialist) => {
        return specialist.id === specialistId
      })
      .flatMap((specialist) => {
        return mapValuesFromArrayObjects(
          mapValuesFromArrayObjects(specialist.languages, 'frameworks'),
          'name',
        )
      })
  }

  return {
    idea,
    publishedAgo,
    pendingUsers,
    statusPositions,
    updateIdea,
    deleteIdea,
    languagesForSpecialist,
    frameworksForSpecialist,
    getIdea,
    getPendingUsers,
    getStatusPositions,
    joinToIdea,
    changeStatusIdea,
    approveUser,
    publishIdea,
    ...rest,
  }
}
