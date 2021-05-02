import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(({ error, store }) => {
  if (!store.getters['auth/isAuth']) {
    return error({
      statusCode: 403,
      message: 'Forbidden',
    })
  }
})
