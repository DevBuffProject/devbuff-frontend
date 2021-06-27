import { computed, ref } from 'vue'
import { useApi } from './useApi'
import { set, useTimeAgo } from '@vueuse/core'

const mapValuesFromArrayObjects = (object, key) => {
  const values = object.reduce((acc, o) => acc.concat(o[key]), [])
  return [...new Set(values)]
}

export const useIdea = (id) => {
  const { request, ...rest } = useApi('ideas')

  const idea = ref({})
  const publishedAgo = useTimeAgo(new Date(idea.value.lastUpdateDate))
  const getIdea = async (uuid = id) => {
    const { data } = await request(`idea/${uuid}`)
    set(idea, data)
    return data
  }

  const pendingUsers = ref()
  const getPendingUsers = async (uuid = id) => {
    const response = await request(`/idea/pending/${uuid}`)
    pendingUsers.value = response.data
    return response
  }

  const statusPositions = ref([])
  const getStatusPositions = async (uuid = id) => {
    const { data } = await request(`/idea/${uuid}/statusPositions`)
    statusPositions.value = data
    return data
  }

  const joinToIdea = async (uuidIdea = id, uuidSpecialist) => {
    await request('/idea/join/' + uuidIdea + '/' + uuidSpecialist, {
      method: 'put',
    })
  }
  const changeStatusIdea = async (uuid = id, status) => {
    await request(`/idea/${uuid}/status`, {
      method: 'PATCH',
      data: { status: status },
    })

    if (status === 'ENABLE_SET_OF_CANDIDATES')
      idea.value.status = 'WAITING_FULL_TEAM'
    else if (status === 'DISABLE_SET_OF_CANDIDATES')
      idea.value.status = 'WORKING'
  }
  const approveUser = async (uuidIdea = id, uuidSpecialisation, uuidUser) => {
    await request(
      `/idea/approve/${uuidIdea}/${uuidSpecialisation}/${uuidUser}`,
      {
        method: 'PUT',
      },
    )
  }

  const publishIdea = async (data) => {
    const formData = new FormData()

    for (const key of Object.keys(data)) {
      formData.append(
        key,
        typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key],
      )
    }

    return (
      await request(`/idea/`, {
        method: 'POST',
        data: formData,
      })
    ).data
  }

  const mapLanguages = (customIdea) =>
    mapValuesFromArrayObjects(customIdea.specialist, 'languages')
  const languages = computed(() =>
    mapLanguages(idea.value).map((lang) => lang.name),
  )

  const mapFrameworks = (customIdea) =>
    mapValuesFromArrayObjects(mapLanguages(customIdea), 'frameworks')
  const frameworks = computed(() =>
    mapFrameworks(idea.value).map((framework) => framework.name),
  )

  return {
    idea,
    publishedAgo,
    pendingUsers,
    statusPositions,
    languages,
    frameworks,
    mapLanguages,
    mapFrameworks,
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
