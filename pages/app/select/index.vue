<template>
    <greeting-card
        v-model="model"
        :candidates="candidatesarry"
        :hide-delimiters="hideDelimiters"
        :show-arrows="showArrows"
        :card-state="cardState"
    />
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import SelectCard from '~/components/SelectCard'
import GreetingCard from '~/components/GreetingCard'
// import { firebase, db } from '~/plugins/firebase'
export default {
    components: {
        // SelectCard
        GreetingCard
    },

    data() {
        return {
            cardState: 'select',
            currCandidate: '',
            currGreetings: [],
            nextState: true,
            testName: '',
            testdata: [],
            Temporary_storage: [],
            counter: 200,
            storemodel: this.$store.getters['app/candidate/model'],
            model: this.$store.getters['app/candidate/model'],
            showArrows: true,
            hideDelimiters: true,
            cycle: false,
            langCode: {
                ja: '日本語',
                zh: '中国語',
                en: '英語',
                be: 'ロシア語',
                pt: 'ポルトガル語',
                es: 'スペイン語',
                fr: 'フランス語',
                de: 'ドイツ語',
                it: 'イタリア語',
                ms: 'マレー語',
                tl: 'フィリピン語',
                vi: 'ベトナム語',
                th: 'タイ語',
                tw: '台湾語'
            },
            a: []
            // userdata: [
            //     {
            //         /**
            //          * データのベタ書きだとちゃんと入るが、この形に整形できなかった。。
            //          * とりあえずダミーでデータを入れておく。これを全部消して、データを挿入して整形してください。
            //          */
            //         birthday: '1992-10-21',
            //         country: 'DJ',
            //         current_greet_hash: null,
            //         fasebook: 'https://www.facebook.com/keishi.abe.5',
            //         favorite_id: 10010011,
            //         fst_lang: 'ml',
            //         greetings: [
            //             {
            //                 content:
            //                     'いしょに行こうの青や橙だいや、もとめたいとジョバンニは、もうだんだかそのきれぎれの考えのように崖が。',
            //                 created_at: '2019-10-04 14:47:00',
            //                 fst_hashtag: 'in',
            //                 hash_id:
            //                     '$2y$10$ZxfQXJhEuQKE6Zs4abTr4uj1tQb8zxM4j8L0Ezhl4zH/BOsO8JNy2',
            //                 id: 36,
            //                 media_url: 'https://lorempixel.com/640/480/?86872',
            //                 snd_hashtag: 'tempore',
            //                 trd_hashtag: 'itaque',
            //                 updated_at: '2019-10-04 14:47:00',
            //                 user_id: 52
            //             }
            //         ],
            //         has_user_voted: false,
            //         icon_url: 'https://lorempixel.com/640/480/?18235',
            //         id: 8,
            //         instagram: 'https://www.instagram.com/aared_3/',
            //         job_type: 7,
            //         name: '青山 治',
            //         profile_text:
            //             'Numquam eius sapiente aut officia aut eos tempore. Iste quis eos qui quidem.',
            //         sex: 1,
            //         snd_lang: 'te',
            //         trd_lang: 'bi',
            //         twitter: 'https://twitter.com/okita_kamegoro'
            //     }
            // ]
        }
    },
    computed: {
        changeCandidates() {
            return this.$store.getters['app/candidate/candidates']
        },
        // コンピューテッドは算出プロパティ
        cardText() {
            return this.content
        },
        onchange() {
            // return this.$store.getters['app/candidate/model']
            const modeling = this.model
            this.$store.commit('app/candidate/linkToModel', modeling)
            return this.model
        },
        candidatesarry() {
            return this.$store.getters['app/candidate/candidates']
        }
    },
    watch: {
        changeCandidates(n) {
            this.$nextTick(() => {
                const arry = [n]
                this.currCandidate = arry
                // this.selectcard_toArryPush(this.candidates())
                // this.selectcard_toArryPush(this.currCandidate)
            })
        },
        onchange(currentNumber) {
            this.$nextTick(() => {
                if (this.candidatesarry.length - currentNumber === 5) {
                    if (this.candidatesarry.length >= 40) {
                        this.model = this.model - 10
                        const currentNum = this.model
                        this.$store.commit(
                            'app/candidate/spliceCandidate',
                            currentNum
                        )
                        return
                    }
                    this.getCandidate()
                }
            })
            return this.model
        }
    },

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
    mounted() {
        this.currCandidate = this.candidates()
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
            } catch (error) {}
        },
        async matchingUser() {
            this.nextState = false
            try {
                await this.$axios.$post(`${process.env.apiBaseUrl}matching`, {
                    userId_you: this.currCandidate.id
                })
            } catch (error) {}
        },
        /**
         * ユーザーのいいねのPOSTが完了してから次のユーザーを呼び出す。
         */
        likeUser() {
            if (this.currCandidate.has_user_voted) {
                this.matchingUser()
            }
            this.postUserLike().then(() => {
                this.nextCandidate()
            })
        },
        greetingcheck() {
            this.currGreetings = Object.keys(this.currCandidate.greetings).map(
                (key) => {
                    return this.currCandidate.greetings[key]
                }
            )
            if (this.currGreetings.length === 0) {
                this.content = '挨拶文はありません'
            } else {
                this.content = this.currGreetings[0].content
            }
        },
        /**
         * 誕生日を計算して年齢を出し、birthdayを書き換える関数
         */
        getage(birth) {
            const year = Number(birth.split('-')[0])
            const month = Number(birth.split('-')[1])
            const day = Number(birth.split('-')[2])
            //

            // 誕生年月日
            const birthday = new Date(year, month - 1, day)

            // 今日
            const today = new Date()

            // 今年の誕生日
            const thisYearBirthday = new Date(
                today.getFullYear(),
                birthday.getMonth(),
                birthday.getDate()
            )

            // 今年-誕生年
            const age = today.getFullYear() - birthday.getFullYear()

            // 今年の誕生日を迎えていなければage-1を返す
            // this.birthday = today < thisYearBirthday ? age - 1 : age
            return today < thisYearBirthday ? age - 1 : age
        },
        /**
         * ジョブタイプの番号から、仕事を特定してjobTypeのデーたを書き換える関数
         */
        job(job) {
            return (this.jobType = this.jobCode[job])
        },
        previousCard() {
            this.$emit('previousCardFromChild')
        },
        nextCard() {
            this.$emit('nextCardFromChild')
        },
        ClickLikeButton() {
            alert(
                JSON.stringify(
                    this.$store.getters['app/candidate/candidates'][this.model]
                )
            )
            this.likeUser(
                this.$store.getters['app/candidate/candidates'][this.model].id
            )
            this.model++
        },
        bindCarousel(e) {
            //
        },
        job_conversion(jobNum) {
            if (this.jobCode[jobNum]) {
                return this.jobCode[jobNum]
            } else {
                return ''
            }
        },
        greetingPullOut(OnePeople) {
            const tmp = Object.keys(OnePeople.greetings).map((key) => {
                return OnePeople.greetings[key]
            })
            if (tmp.length === 0) {
                return '挨拶文はありません'
            } else {
                return tmp[0].content
            }
        }
    }
}
</script>
