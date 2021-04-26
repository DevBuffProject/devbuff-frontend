import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(({ error, $auth }) => {
  if (!$auth.hasScope('ROLE_ADMIN')) {
    return error({
      statusCode: 403,
      message: 'Forbidden',
    })
  }
})
