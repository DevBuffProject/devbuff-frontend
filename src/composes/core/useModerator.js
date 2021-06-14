import { useApi } from './useApi'
import { ref } from 'vue'

const { request, BASE_URL, error } = useApi()
const ideaForValidation = ref([])

export const useModeration = () => {
  const loadForIdeasValidation = async () => {
    const data = await request('idea/moderator/waiting')
    ideaForValidation.value = data.data
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
    const indexIdea = ideaForValidation.value.findIndex((idea) => {
      if (idea.id === uuid) {
        return true
      }
    })

    if (indexIdea !== -1) {
      ideaForValidation.value.splice(indexIdea, 1)
    }
  }

  return {
    ideaForValidation,
    loadForIdeasValidation,
    approveIdea,
    deleteIdea,
  }
}
