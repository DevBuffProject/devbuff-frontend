import { computed, ref } from 'vue'
import { useApi } from './useApi'

export const useSkills = () => {
  const { request, ...rest } = useApi()
  const skills = ref([])

  const languages = computed(
    () => skills.value.map((skill) => skill.name) || [],
  )
  const specializations = computed(() =>
    Array.from(
      new Set(
        skills.value.reduce((specs, skill) => {
          skill.specializations.forEach((s) => specs.push(s.name))
          return specs
        }, []),
      ),
    ),
  )

  const getSkills = async () => {
    const { data } = await request('/skills', { method: 'get' })
    skills.value = data
    return data
  }

  return {
    skills,
    languages,
    specializations,
    getSkills,
    ...rest,
  }
}
