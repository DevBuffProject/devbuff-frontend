import { useAuth } from '../composes/services'

export default async () => useAuth().isAdmin.value
