export const state = () => ({
  chatlists: []
})
export const getters = {
  chatLists: (state) => state.chatlists
}
export const mutations = {
  chatLists(state, payload) {
    state.chatlists = payload
  }
}
export const actions = {
  getChatList({ commit }, payload) {
    commit('chatLists', payload)
  }
}
