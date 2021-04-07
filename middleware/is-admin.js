export default ({ store, error }) => {
  const isAdmin = store.getters['auth/isAdmin']

  if (!isAdmin) {
    return error({
      statusCode: 403,
      message: 'Forbidden',
    })
  }
}
