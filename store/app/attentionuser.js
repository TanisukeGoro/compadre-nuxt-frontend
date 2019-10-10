export const state = () => ({
  data: []
})
export const getters = {
  data: (state) => state.data
}
export const mutations = {
  GetUserInfo(state, payload) {
    state.data = payload
  }
}
export const actions = {
  async GetUserInfo({ commit }, userId) {
    let response = []
    try {
      const _response = await this.$axios.$get(
        `${process.env.apiBaseUrl}user/${userId}`
      )
      // console.log('変数に入れる前のresponse', _response)
      response = _response
    } catch (error) {
      // console.log(error)
    }
    // console.log('クリックしたuserの情報', response)
    commit('GetUserInfo', response)
  }
  // async teGetUserInfost({ commit }, userId) {
  //     await this.$axios
  //         .$get(`${process.env.apiBaseUrl}user/${userId}`)
  //         .then((res) => {
  //             if (res.length === 0) {
  //                 res.push({
  //                     content: `挨拶カードはまだありません!!\n新しく作ってみましょう！`,
  //                     fst_hashtag: '',
  //                     hash_id: '',
  //                     media_url: '',
  //                     snd_hashtag: '',
  //                     trd_hashtag: ''
  //                 })
  //             }
  //             const greetingsArr = []
  //             // SlectCardSlidのデータ構造に合わせる
  //             res.greetings = [res[0]]
  //             const set = Object.assign({}, res)
  //             greetingsArr.push(set)

  //             console.log('クリックしたuserの情報', greetingsArr)
  //             commit('GetUserInfo', greetingsArr)
  //         })
  // }
}
