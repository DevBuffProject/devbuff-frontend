import { useApi } from './useApi'
import { ref } from 'vue'

const { request, BASE_URL, error } = useApi()
const pendingIdeas = ref([])

export const useModeration = () => {
  const getPendingIdeas = async () => {
    const data = await request('idea/moderator/waiting')
    pendingIdeas.value = data.data
  }

  const approveIdea = async (uuid) => {
    await request(`idea/moderator/submit/${uuid}`)
    deleteIdeaFromRef(uuid)
  }

  const deleteIdea = async (uuid) => {
    await request(`idea/moderator/delete/${uuid}`)
    deleteIdeaFromRef(uuid)
  }

  const deleteIdeaFromRef = (uuid) => {
    const indexIdea = pendingIdeas.value.findIndex((idea) => {
      if (idea.id === uuid) {
        return true
      }
    })

    if (indexIdea !== -1) {
      pendingIdeas.value.splice(indexIdea, 1)
    }
  }

  return {
    pendingIdeas,
    getPendingIdeas,
    approveIdea,
    deleteIdea,
  }
}
