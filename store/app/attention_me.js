export const state = () => ({
    data: ''
})
export const getters = {
    data: (state) => state.data
}
export const mutations = {
    GetAttentionMe(state, payload) {
        state.data = payload
    }
}
export const actions = {
    async GetAttentionMe({ commit }) {
        let response = []
        try {
            const _response = await this.$axios.$get(
                `${process.env.apiBaseUrl}matching/islike`
            )
            response = _response
        } catch (error) {
            // console.log(error)
        }
        commit('GetAttentionMe', response)
    }
}
