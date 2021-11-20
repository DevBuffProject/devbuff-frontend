import { useApi } from './useApi'

export const useSkillManager = () => {
  const { request, error, ...rest } = useApi()

  const addLanguage = async (language) => {
    await request(`/skill/manager/language`, {
      indicator: false,
      method: 'patch',
      data: {
        languageName: language,
      },
    })
  }

  return {
    addLanguage,
  }
}
