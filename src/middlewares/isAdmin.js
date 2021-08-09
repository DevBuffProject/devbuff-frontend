import { useAuth } from '../composes/core'

export default async () => useAuth().isAdmin.value
