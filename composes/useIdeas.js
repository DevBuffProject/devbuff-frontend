import { ref } from '@nuxtjs/composition-api'
import api from './api'

// TEST
export default () => {
  const ideas = ref([])
  const fetchIdeas = () =>
    new Promise((resolve) => {
      setTimeout(async () => {
        const { data } = await api.get(
          'https://jsonplaceholder.typicode.com/posts'
        )
        ideas.value = data
        resolve(data)
      }, 5000)
    })

  return {
    ideas,
    fetchIdeas,
  }
}
