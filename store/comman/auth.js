export const state = () => ({
    data: ''
})
export const getters = {
    data: (state) => state.data
}
export const mutations = {
    jwtAuth(state, payload) {
        state.data = payload
    }
}
export const actions = {
    jwtAuth({ commit }, payload) {
        // この前後にも関数を書いてもいい。
        // ここでデータを確定してmutationsに送る感じ
        commit('jwtAuth', payload)
    },
    candidate({ commit }, payload) {
        commit('candidate', payload)
    }
}
