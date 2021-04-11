export const actions = {
  async getCountries() {
    const params = new URLSearchParams()
    params.append('need_all', 1)
    params.append('count', 1000)
    params.append('v', '5.130')
    const { response } = await this.$api.vkdata.get('database.getCountries', {
      params,
    })
    return response?.items
  },
  async getCities(_, { country, query }) {
    const params = new URLSearchParams()
    params.append('need_all', 1)
    params.append('count', 1000)
    params.append('country_id', country)
    params.append('v', '5.130')
    if (query) params.append('q', query)
    const { response } = await this.$api.vkdata.get('database.getCities', {
      params,
    })
    return response?.items
  },
}
