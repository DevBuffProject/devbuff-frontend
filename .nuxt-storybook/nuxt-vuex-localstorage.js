import bindStorage from 'nuxt-vuex-localstorage/plugins/bindStorage'

export default (ctx) => {
  const options = {"localStorage":["shared"],"sessionStorage":["session"]}
  bindStorage(ctx, options)
}
