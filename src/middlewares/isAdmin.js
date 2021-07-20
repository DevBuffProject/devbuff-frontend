import { useAuth } from '../composes/core'

export default async () => {
  const { isAdmin } = useAuth()

  if (isAdmin.value === false) {
    return isAdmin.value
  }
}
