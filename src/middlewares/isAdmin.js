import { useAuth } from '../composes'

export default async () => {
  const { getStatus, isAdmin } = useAuth()
  await getStatus()
  return isAdmin.value
}
