export const state = () => ({
  loaded: false,
  pageName: null,

  _session: {
  },

  _shared: {
    colors: 'light'
  }
})

export const mutations = {
  setPageName: (state, name) => state.pageName = name
}

export const getters = {
  pageName: state => state.pageName
}
