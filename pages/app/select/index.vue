<template>
    <v-content>
        <v-container>
            <!-- スロット -->
            <SelectCard> </SelectCard>
            <v-btn color="primary" @click="nextState && nextCandidate()"
                >次のユーザ</v-btn
            >
            <p>{{ currCandidate.name }}</p>
            <p>{{ nextState }}</p>
            <v-btn color="primary" @click="nextState && likeUser()"
                >いいね</v-btn
            >
        </v-container>
    </v-content>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SelectCard from '~/components/greetings/SelectCard'
// import { firebase, db } from '~/plugins/firebase'
export default {
    components: {
        SelectCard
    },
    data() {
        return {
            currCandidate: '',
            nextState: true
        }
    },
    // computed: {
    //     curr_candidate() {
    //         return true
    //     }
    // },
    // ページが呼び出されたらcandidateを呼び出す
    // fetchを async とすることで、getCandidateの通信が完了するまで待機できる
    async fetch({ store }) {
        if (store.getters['app/candidate/candidates'].length < 5) {
            await store.dispatch(
                'app/candidate/getCandidate',
                {},
                { root: true }
            )
        }
    },
    // created : インスタンスの初期化完了・propsやcomputedにアクセス可・DOMへのアクセス不可
    created() {},
    // mounted : created + DOMへのアクセス可能
    mounted() {
        this.currCandidate = this.candidates()[0]
    },
    methods: {
        // バインディングヘルパーを使う
        ...mapActions('app/candidate', ['getCandidate', 'popCandidate']),
        ...mapState('app/candidate', ['candidates']),

        /**
         * 次の候補者を選択する
         * nextStateで連打による誤作動を防いでいる。
         */
        async nextCandidate() {
            this.nextState = false // 連打による誤作動を防ぐ
            this.candidates().length < 5 && (await this.getCandidate())
            this.popCandidate(this.candidates()).then((currUser) => {
                this.currCandidate = currUser
                this.nextState = true
            })
        },

        /**
         * ユーザーによるいいねをPOSTしてる。
         * nuxtStateで連打による誤作動を防止している。
         */
        async postUserLike() {
            this.nextState = false
            try {
                await this.$axios.$post(
                    `${process.env.apiBaseUrl}matching/like`,
                    {
                        userId_you: this.currCandidate.id
                    }
                )
                this.nextState = false
            } catch (error) {
                console.log(error)
            }
        },
        async matchingUser() {
            this.nextState = false
            try {
                const postResults = await this.$axios.$post(
                    `${process.env.apiBaseUrl}matching`,
                    {
                        userId_you: this.currCandidate.id
                    }
                )
                console.log(postResults)
            } catch (error) {
                console.log(error)
            }
        },
        /**
         * ユーザーのいいねのPOSTが完了してから次のユーザーを呼び出す。
         */
        likeUser() {
            console.log(
                this.currCandidate.name,
                this.currCandidate.id,
                this.currCandidate.has_user_voted
            )
            if (this.currCandidate.has_user_voted) {
                console.log('マッチング!!!')
                this.matchingUser()
            }
            this.postUserLike().then(() => {
                this.nextCandidate()
            })
        }
    }
}
</script>
