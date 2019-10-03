export const state = () => ({
    data: ''
})
export const getters = {
    data: (state) => state.data
}
export const mutations = {
    // jwtAuth(state, payload) {
    //     state.data = payload
    // },
    // loginUserData(state, payload) {
    //     state.data = payload
    // },
    getLoginUser(state, payload) {
        state.data = payload
    }
}
export const actions = {
    // candidate({ commit }, payload) {
    //     commit('candidate', payload)
    // },
    // loginUserData({ commit }, payload) {
    //     commit('loginUserData', payload, { root: true })
    // },
    async getLoginUser({ commit }) {
        console.log('debug001')
        let response = []
        try {
            const _response = await this.$axios.$get(
                `${process.env.apiBaseUrl}user`
            )
            response = _response
        } catch (error) {
            console.log(error)
        }
        console.log(response, '先に呼び出されなきゃあかんやろ')
        commit('getLoginUser', response)
        return '完了'
    }
}
