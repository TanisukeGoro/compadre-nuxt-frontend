export const state = () => ({
    candidates: []
})
export const getters = {
    candidates: (state) => state.candidates
}
export const mutations = {
    getCandidate(state, payload) {
        state.candidates = state.candidates.concat(payload)
    },
    popCandidate(state, payload) {
        state.candidates = payload
    }
}
export const actions = {
    async getCandidate({ commit }) {
        console.log('debug001')
        let response = []
        try {
            const _response = await this.$axios.$get(
                `${process.env.apiBaseUrl}matching/candidate`
            )
            response = _response
        } catch (error) {
            console.log(error)
        }
        console.log(response)
        commit('getCandidate', response)
    },
    popCandidate({ commit }, payload) {
        const castPayload = [...payload]
        const currUser = castPayload.pop()
        commit('popCandidate', castPayload)
        return currUser
    }
}
