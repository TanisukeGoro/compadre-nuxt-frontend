<template>
    <div>
        <v-carousel
            v-model="model"
            :show-arrows="showArrows"
            :hide-delimiters="hideDelimiters"
            :cycle="cycle"
            :light="true"
            :continuous="false"
            @click.native="bindCarousel"
        >
            <v-carousel-item
                v-for="candidate in candidatesarry"
                :key="candidate.candidateId"
            >
                <v-card class="selectcard">
                    <v-card class="mx-auto" max-width="344" flat>
                        <v-list-item three-line>
                            <v-list-item-avatar tile size="80">
                                <v-img
                                    class="elevation-6 profileimg"
                                    style="border-radius:50%;"
                                    max-width="100px"
                                    :src="candidate.icon_url"
                                ></v-img>
                            </v-list-item-avatar>
                            <div style="overflow:scroll;">
                                <div class="headline" style="overflow:scroll;">
                                    {{ candidate.name }},
                                    <span
                                        style="font-size:18px; overflow: scroll;"
                                        >{{ getage(candidate.birthday) }}</span
                                    >
                                </div>
                                <div
                                    class="subtitle-1 subtitle"
                                    style="color:#959595"
                                >
                                    Tokyo/shibuya
                                </div>
                                <div
                                    class="subtitle-1 subtitle"
                                    style="color:#959595"
                                >
                                    {{ job(candidate.job_type) }}
                                </div>
                            </div>
                        </v-list-item>
                    </v-card>
                    <v-row>
                        <v-card-text
                            class="title font-weight-bold pb-0 pt-0 greetingarea"
                            >{{ greetingPullOut(candidate) }}</v-card-text
                        >
                    </v-row>
                    <v-layout>
                        <v-list class="mr-3">
                            <v-icon>mdi-access-point</v-icon>
                        </v-list>
                        <v-list class="mr-3">
                            {{ job_conversion(candidate.fst_lang) }}
                        </v-list>
                        <v-list class="mr-3">
                            {{ job_conversion(candidate.snd_lang) }}
                        </v-list>
                        <v-list class="mr-3">
                            {{ job_conversion(candidate.trd_lang) }}
                        </v-list>
                    </v-layout>
                    <v-row>
                        <v-container fluid>
                            <LikeButton
                                @ClickLikebutton="
                                    nextState && ClickLikeButton()
                                "
                            />
                        </v-container>
                    </v-row>
                </v-card>
            </v-carousel-item>
        </v-carousel>
        <!-- {{ onchange }} -->
    </div>
</template>

<script>
import '@/assets/selectcard.css'
import { mapState, mapActions } from 'vuex'
import LikeButton from '~/components/LikeButton'
export default {
    components: {
        LikeButton
    },
    // filters: { //filtersはthisで他のプロパティにアクセエスできない.ので諦めた
    //     jobfilter(jobNumber) {
    //         // return jobNumber + 'dd'
    //         return this.job(jobNumber)
    //     }
    // },
    props: {},
    data() {
        return {
            counter: 200,
            storemodel: this.$store.getters['app/(candidate/model'],
            model: this.$store.getters['app/candidate/model'],
            showArrows: true,
            hideDelimiters: true,
            cycle: false,
            nextState: true,
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
            }
            // cardText: this.content
        }
    },
    computed: {
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
            console.log(
                '現在のstoreのcandidatesのlengthは:',
                this.$store.getters['app/candidate/candidates'].length
            )
            return this.$store.getters['app/candidate/candidates']
        }
    },
    watch: {
        onchange(currentNumber) {
            this.$nextTick(() => {
                if (this.candidatesarry.length - currentNumber === 5) {
                    console.log('残り５にんです')
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
    mounted() {},
    methods: {
        // バインディングヘルパーを使う
        ...mapActions('app/candidate', [
            'getCandidate',
            'popCandidate',
            'getCandidateUpdate',
            'spliceCandidate'
        ]),
        ...mapState('app/candidate', ['candidates']),

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
            // console.log(e)
        },
        /**
         * ユーザーによるいいねをPOSTしてる。
         * nuxtStateで連打による誤作動を防止している。
         */
        async postUserLike(LikedID) {
            this.nextState = false
            try {
                await this.$axios.$post(
                    `${process.env.apiBaseUrl}matching/like`,
                    {
                        userId_you: LikedID
                    }
                )
                console.log(LikedID)
                this.nextState = true
            } catch (error) {
                console.log(error)
            }
        },
        async matchingUser(LikedID) {
            console.log(LikedID)

            this.nextState = false
            try {
                const postResults = await this.$axios.$post(
                    `${process.env.apiBaseUrl}matching`,
                    {
                        userId_you: LikedID
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
        likeUser(LikedID) {
            console.log(
                this.$store.getters['app/candidate/candidates'][this.model]
                    .name,
                this.$store.getters['app/candidate/candidates'][this.model].id,
                this.$store.getters['app/candidate/candidates'][this.model]
                    .has_user_voted
            )
            if (
                this.$store.getters['app/candidate/candidates'][this.model]
                    .has_user_voted
            ) {
                console.log('マッチング!!!')
                this.matchingUser(LikedID)
            }
            this.postUserLike(LikedID)
        },
        /**
         * 誕生日を計算して年齢を出し、birthdayを書き換える関数
         */ getage(birth) {
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
        job(job) {
            return this.jobCode[job]
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

<style></style>
