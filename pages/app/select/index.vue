<template>
    <v-content style="background-color:white;">
        <v-container>
            <!-- スロット -->
            <SelectCardSlideTest :ptestdatas="testdata" />
        </v-container>
    </v-content>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import SelectCard from '~/components/SelectCard'
import SelectCardSlideTest from '~/components/SelectCardSlideTest'
// import { firebase, db } from '~/plugins/firebase'
export default {
    components: {
        // SelectCard
        SelectCardSlideTest
    },

    data() {
        return {
            currCandidate: '',
            currGreetings: [],
            content: '',
            birthday: 0,
            src: '',
            jobType: 'test',
            jobCode: {
                1: '事務・オフィス系',
                2: '販売・飲食・サービス系',
                3: 'IT・エンジニア系',
                4: 'Web・クリエイター系',
                5: '医療・介護・福祉系',
                6: '研究機関・教育系',
                7: '商社・金融・経営',
                8: '学生'
            },
            nextState: true,
            testName: '',
            testdata: [],
            Temporary_storage: []
        }
    },
    computed: {
        changeCandidates() {
            return this.$store.getters['app/candidate/candidates']
        }
    },
    watch: {
        changeCandidates(n) {
            this.$nextTick(() => {
                const arry = [n]
                this.currCandidate = arry
                console.log(
                    '親コンポーネント/watchの中でstoreの新しい変数を取得/currCandidate=""に入れるが、それを使えない',
                    this.currCandidate
                )
                // this.selectcard_toArryPush(this.candidates())
                // this.selectcard_toArryPush(this.currCandidate)
            })
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
    // created : インスタンスの初期化完了・propsやcomputedにアクセス可・DOMへのアクセス不可
    created() {},
    // mounted : created + DOMへのアクセス可能
    mounted() {
        this.currCandidate = this.candidates()
        console.log(
            'マウンテッドで最初にcurrCandidateへ10人を入れる',
            this.currCandidate
        )
        // this.selectcard_toArryPush(this.candidates())
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
            // console.log(this.candidates().length)
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
                console.log(this.currCandidate)
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
        },
        /**
         * greetingの中身をを返す。もし空だったら’挨拶文はありません’を返す
         * これは実際に使える関数だが、セレクトカードが[スワイプ]の場合は使わないので、コメントアウトしてある
         */
        // greetingcheck() {
        //     this.currGreetings = Object.keys(this.currCandidate.greetings).map(
        //         (key) => {
        //             return this.currCandidate.greetings[key]
        //         }
        //     )
        //     // console.log(this.currCandidate.greetings)
        //     // Object.assign(this.currC/・andidate.greetings, this.currGreetings)
        //     console.log(this.currGreetings.length)
        //     console.log(this.currGreetings)

        //     // console.log(JSON.stringify(this.$store.state.works.worksData))
        //     // this.currGreetings = this.currCandidate.greetings
        //     // this.currGreetings = new Array(this.currCandidate.greetings)
        //     // console.log(this.currCandidate.greetings)
        //     // console.log(Array.isArray(this.currCandidate.greetings))
        //     // console.log([...Array(this.currCandidate.greetings)].length)
        //     // console.log(this.currGreetings.length)
        //     if (this.currGreetings.length === 0) {
        //         this.content = '挨拶文はありません'
        //     } else {
        //         this.content = this.currGreetings[0].content
        //     }
        // },
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
            // console.log(year + ' ' + month + ' ' + day)

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
        }
        /**
         * セレクトカードの10人(TenPeople)を取ってきて、testdata(配列)に入れる(push)処理
         */
        // selectcard_toArryPush(TenPeople) {
        //     for (let i = 0; i < 10; i++) {
        //         // console.log(n)
        //         const temp = {}
        //         temp.name = TenPeople[i].name
        //         temp.birthday = this.getage(TenPeople[i].birthday)
        //         temp.presentLocation = 'TokyoShibuya/今はデータがない'
        //         temp.jobtype = this.job(TenPeople[i].job_type)
        //         temp.fst_lang = TenPeople[i].fst_lang
        //         temp.snd_lang = TenPeople[i].snd_lang
        //         temp.trd_lang = TenPeople[i].trd_lang

        //         this.currGreetings = Object.keys(TenPeople[i].greetings).map(
        //             (key) => {
        //                 return TenPeople[i].greetings[key]
        //             }
        //         )
        //         if (this.currGreetings.length === 0) {
        //             temp.content = '挨拶文はありません'
        //         } else {
        //             temp.content = this.currGreetings[0].content
        //         }
        //         // console.log(temp)
        //         this.testdata.push(temp)
        //     }
        //     console.log('testdataの配列は "' + this.testdata.length + '" 個')
        //     if (this.testdata.length > 30) {
        //         console.log('30を超えた')
        //         this.Temporary_storage = this.testdata
        //         this.Temporary_storage.splice(0, 9)
        //         this.testdata = []
        //         this.testdata.push(this.Temporary_storages)
        //         console.log(this.testdata, '新しいtestdata')
        //         // this.testdata.splice(0, 9)
        //     }
        //     console.log(
        //         '親コンポーネント/新しい10人を配列に入れる関数が呼ばれた最後',
        //         this.testdata
        //     )
        // }
    }
}
</script>
