export const state = () => ({
  candidates: [],
  model: 0
})
export const getters = {
  candidates: (state) => state.candidates,
  model: (state) => state.model
}
export const mutations = {
  getCandidateUpdate(state, payload) {
    // stateのcandidatesを上書きする
    state.candidates = payload
  },
  getCandidate(state, payload) {
    state.candidates = state.candidates.concat(payload)
  },
  // popCandidate(state, payload) {
  //     state.candidates = payload
  // },
  linkToModel(state, payload) {
    state.model = payload
  },
  spliceCandidate(state, payload) {
    // state.candidates = []
    state.candidates.splice(0, 10)
    state.model = payload - 10
    // state.candidates.unshift({
    //     name: 'AAAAAAAAAAA',
    //     birthday: '2000-9-13',
    //     job_type: 1,
    //     greetings: [{ content: 'kんいぢ' }],
    //     fst_lang: 'js',
    //     snd_lang: 'si',
    //     trd_lang: '建造'
    // })
  }
}
export const actions = {
  async getCandidate({ commit }) {
    let response = []
    try {
      const _response = await this.$axios.$get(
        `${process.env.apiBaseUrl}matching/candidate`
      )
      response = _response.filter((i) => i.greetings.length > 0)
    } catch (error) {}
    commit('getCandidate', response)
  },
  // popCandidate({ commit }, payload) {
  //     const castPayload = [...payload]
  //     const currUser = castPayload.pop()
  //     commit('popCandidate', castPayload)
  //     return currUser
  // },
  linkToModel({ commit }, payload) {
    commit('modeling', payload, { root: true })
  },
  spliceCandidate({ commit }, payload) {
    commit('currentNum', payload, { root: true })
  }
}
