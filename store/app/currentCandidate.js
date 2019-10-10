export const state = () => ({ candidates: [], model: 0 })
export const getters = {
  model: (state) => state.model
}
export const mutations = {
  getCandidate(state, payload) {
    state.candidates = state.candidates.concat(payload)
  },
  model(state) {
    state.model = 0
  }
}
export const actions = {
  async getCandidate({ commit }) {
    let response = []
    try {
      const _response = await this.$axios.$get(
        `${process.env.apiBaseUrl}matching/candidate`
      )
      response = _response
    } catch (error) {}

    commit('getCandidate', response)
  },
  model({ commit, payload }) {
    const n = 0
    commit(n, payload)
  }
}
