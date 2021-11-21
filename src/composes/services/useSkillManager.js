import { useApi } from './useApi'

export const useSkillManager = () => {
  const { request, error, ...rest } = useApi()

  const updateLanguage = async (language, insert = true) => {
    await request(`/skill/manager/language`, {
      indicator: false,
      method: insert ? 'patch' : 'delete',
      data: {
        languageName: language,
      },
    })
  }

  const updateSpecialist = async (specialist, insert = true) => {
    await request(`/skill/manager/specialist`, {
      indicator: false,
      method: insert ? 'patch' : 'delete',
      data: {
        specialistName: specialist,
      },
    })
  }

  const updateFramework = async (framework, insert = true) => {
    await request(`/skill/manager/framework`, {
      indicator: false,
      method: insert ? 'patch' : 'delete',
      data: {
        frameworkName: framework,
      },
    })
  }
  const assignSpecialist = async (language, specialist, isAssign = true) => {
    await request(`/skill/manager/tree/specialist`, {
      indicator: false,
      method: isAssign ? 'patch' : 'delete',
      data: {
        languageName: language,
        specialistName: specialist,
      },
    })
  }

  const assignFramework = async (
    language,
    specialist,
    framework,
    isAssign = true,
  ) => {
    await request(`/skill/manager/tree/framework`, {
      indicator: false,
      method: isAssign ? 'patch' : 'delete',
      data: {
        languageName: language,
        specialistName: specialist,
        frameworkName: framework,
      },
    })
  }

  const getData = async () => {
    return await request(`/skill/manager/data`, {
      indicator: false,
    })
  }

  return {
    updateLanguage,
    updateSpecialist,
    updateFramework,
    assignSpecialist,
    assignFramework,
    getData,
  }
}
