import { qs } from '~/assets/js/url'

export const state = () => ({
  list: [],
  own: [],
  idea: {},
  statusPositions: [],
  pendingUsers: []
})

export const mutations = {
  setIdeas: (state, list) => state.list = list,
  setOwnIdeas: (state, list) => state.own = list,
  setIdea: (state, idea) => state.idea = idea,
  setPendingUsers: (state, pendingUsers) => state.pendingUsers = pendingUsers,
  setStatusPositions: (state, statusPositions) => state.statusPositions = statusPositions,
  deletePendingUser: (state, data)=>{
    state.pendingUsers.forEach((currentValue, index, object) => {
      if (currentValue.specialisationId === data.specializationId &&
        currentValue.userEntity.id === data.userId) {
        state.pendingUsers.splice(index, 1);
      }
    });
  }
}

export const actions = {
  async getPendingUsers({ commit }, ideaId) {
    const pendingUsers = await this.$api.latest.get(`idea/pending/${ideaId}`)

    commit('setPendingUsers', pendingUsers)

    return pendingUsers
  },

  async getStatusPositions({ commit }, ideaId) {
    const statusPositions = await this.$api.latest.get(`idea/${ideaId}/statusPositions`)

    commit('setStatusPositions', statusPositions)

    return statusPositions
  },

  async respondPosition(ctx, { idea, position }) {
    return await this.$api.latest.put(`idea/join/${idea}/${position}`)
  },

  async appendIdea(ctx, data) {

    let formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("specialist",JSON.stringify(data.specialist));
    formData.append("text",data.text);
    //TODO logo

    return await this.$api.latest.post('idea', formData);
  },

  async updateIdea(ctx, { id, data }) {
    return await this.$api.latest.put(`idea/${id}`, data)
  },

  async deleteIdea(ctx, id) {
    return await this.$api.latest.delete(`idea/${id}`)
  },

  async getOwnIdeas({ commit, state }) {
    const ideas = await this.$api.latest.get('/idea/self')
    commit('setOwnIdeas', ideas)

    return ideas
  },

  async getIdeas({ commit, state }, params) {
    const finalParams = {
      page: 1,
      sortBy: 'date',
      ...params
    }
    const query = qs.stringify(finalParams)
    console.log(['/idea/', query].join('?'))
    // const query = ''
    const ideas = await this.$api.latest.get(['/idea/', query].join('?'))
    commit('setIdeas', ideas)

    return ideas
  },

  async getIdea({ commit }, uuid) {
    const idea = await this.$api.latest.get(`/idea/${uuid}`)
    commit('setIdea', idea)

    return idea
  },

  async acceptUser({commit}, data){
    await this.$api.latest.put(`/idea/approve/${data.ideaId}/${data.specializationId}/${data.userId}`);
    commit('deletePendingUser',data);
  }
}

export const getters = {
  list: state => state.list,
  own: state => state.own,
  idea: state => state.idea,
  pendingUsers: state => state.pendingUsers,
  statusPositions: state => state.statusPositions,
  isUserResponded: state => specializationId => {
    const pos = state.statusPositions.find(s => s.specializationId === specializationId)

    return pos.positionStatus === 'PENDING'
  }
}
