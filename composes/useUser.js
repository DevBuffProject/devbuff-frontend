import { useStore, computed } from '@nuxtjs/composition-api'

export const useUser = () => {
  const store = useStore()
  const user = computed(() => store.getters['auth/user'])
  const isAuth = computed(() => store.getters['auth/isAuth'])
  const isAdmin = computed(() => store.getters['auth/isAdmin'])

  return {
    user,
    isAuth,
    isAdmin,
  }
}
