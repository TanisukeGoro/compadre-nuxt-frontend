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
    setPostsRef: firestoreAction(function(context, ref) {
        context.bindFirestoreRef('posts', ref)
    })
}
