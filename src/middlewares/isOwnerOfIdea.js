import { useAuth, useUser, useIdea } from '../composes/core'

export default async (route) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn || route.params.id === undefined) {
    return false
  }
  const ideaId = route.params.id
  const { idea, getIdea } = useIdea(ideaId)

  await getIdea()
  const { user, getUser } = useUser()

  await getUser()

  return user.value.id === idea.value.ownerIdea.id
}
