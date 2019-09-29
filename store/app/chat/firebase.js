import { firestoreAction } from 'vuexfire'
export const state = () => ({
    posts: []
})
export const getters = {
    posts: (state) => state.posts
}

/**
 * mutationのみルートに作る必要があるので、index.jsに引っ越しさせた。
 *
 * https://qiita.com/TsukasaGR/items/e8a47889f65c53751309
 *
 */

export const actions = {
    /**
     * コールバックをasync, awaitするのめっちゃ大事。
     */
    setPostsRef: firestoreAction(async function(context, ref) {
        console.log('データの取得開始')
        await context.bindFirestoreRef('posts', ref)
        console.log('データの取得終わり')
    })
}
