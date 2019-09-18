export const state = () => ({
    data: ''
})
export const getters = {
    data: (state) => state.data
}
export const mutations = {
    jwt_auth(state, payload) {
        state.data = payload
    }
}
export const actions = {
    jwt_auth({ commit }, payload) {
        commit('jwt_auth', payload)
    }
}
