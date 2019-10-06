<script>
/**
 * 挨拶のカードを描画するコンポーネント
 * 基本的に、ディスプレイの縦の長さに合わせて伸縮するようにする
 * 配列の長さが1なら1枚、1枚以上ならスライド可能にする
 *
 * データの形式
 *
 * 子コンポーネント
 *   - Hi ! ボタン
 *   - コンポーネントの登録ボタン
 *   - 新規作成・編集・削除ボタン
 *   -
 *
 */
</script>

<template>
    <v-app>
        <v-content>
            <v-carousel
                v-model="carousel"
                height="100%"
                :hide-delimiters="true"
                :show-arrows="showArrows"
                :touchless="touchless"
                :cycle="false"
                :light="true"
                :continuous="false"
            >
                <v-carousel-item
                    v-for="candidate in displayCandidate"
                    :key="candidate.candidateId"
                >
                    <v-card
                        height="100%"
                        max-width="344"
                        class="mx-auto pt-4"
                        flat
                        color="background"
                    >
                        <v-list-item>
                            <v-list-item-avatar color="grey" size="72">
                                <v-img
                                    src="https://the-madison.s3-ap-northeast-1.amazonaws.com/images/wg5TX0SUwAptlVftxw1dlEG5iZewrwoinKOvmPbw.jpeg"
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title
                                    class="headline  grey--text text--darken-3"
                                >
                                    {{ candidate.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle
                                    class="grey--text text--darken-1"
                                >
                                    <p
                                        class="inline iti-flag mr-1"
                                        :class="candidate.country.toLowerCase()"
                                    ></p>
                                    {{
                                        candidate.country
                                            | countryCode2countryName
                                    }}
                                    {{ candidate.birthday | yyyymmdd2Age }}歳
                                </v-list-item-subtitle>
                                <v-list-item-subtitle
                                    class="grey--text text--darken-1"
                                >
                                    {{ jobCode[candidate.job_type] }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <!-- 表示用 -->
                        <v-card-text
                            v-if="
                                cardState === 'select' ||
                                    cardState === 'preview'
                            "
                            class="subtitle-1 grey--text text--darken-3"
                        >
                            {{
                                candidate.greetings.length > 0
                                    ? candidate.greetings[0].content
                                    : 'No Messages...'
                            }}
                        </v-card-text>
                        <!-- 編集用 -->
                        <v-textarea
                            v-if="cardState === 'edit'"
                            v-model="propsContent"
                            class="card-text__font pa-2"
                            auto-grow
                            color="accent"
                            autofocus
                            clearable
                            placeholder="'What do you want to do?'"
                            label="Edit Greeting"
                            :counter="counter"
                            rows="1"
                        >
                        </v-textarea>

                        <v-divider color="grey"></v-divider>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title
                                    class="subtitle-2 grey--text"
                                >
                                    <v-icon class="mr-3 grey--text"
                                        >mdi-voice</v-icon
                                    >
                                    {{
                                        candidate.fst_lang | langCode2langName
                                    }},
                                    {{
                                        candidate.snd_lang | langCode2langName
                                    }},
                                    {{ candidate.trd_lang | langCode2langName }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-card-actions>
                            <!-- <v-flex xs1>
                                <v-btn
                                    v-if="cardState === 'select'"
                                    color="accent"
                                    absolute
                                    bottom
                                    @click="isshow = !is"
                                >
                                    Hi !
                                </v-btn>
                            </v-flex> -->
                            <span v-if="cardState === 'select'" class="likebtn">
                                <LikeButton @ClickLikebutton="HiClick" />
                            </span>
                            <div
                                v-if="cardState === 'edit'"
                                class="SaveCancelBtn"
                            >
                                <v-btn
                                    color="success"
                                    outlined
                                    @click="editCancel"
                                    >Cancel</v-btn
                                >
                                <v-btn color="success" @click="editSave"
                                    >Save</v-btn
                                >
                            </div>
                            <the-editor-btn
                                v-if="cardState === 'preview'"
                                @assignFromChild="assginState($event)"
                            />
                        </v-card-actions>
                    </v-card>
                </v-carousel-item>
            </v-carousel>
        </v-content>
    </v-app>
</template>

<script>
import '@/assets/selectcard.css'
import { mapState, mapActions } from 'vuex'
import LikeButton from '~/components/LikeButton'
import TheEditorBtn from '~/components/TheEditorBtn'
export default {
    components: {
        LikeButton,
        TheEditorBtn
    },
    // filters: { //filtersはthisで他のプロパティにアクセエスできない.ので諦めた
    //     jobfilter(jobNumber) {
    //         // return jobNumber + 'dd'
    //         return this.job(jobNumber)
    //     }
    // },
    props: {
        carouselCount: {
            type: Number,
            default: 0
        },
        candidates: {
            type: Array,
            default: () => {}
        },
        showArrows: {
            type: Boolean,
            default: true
        },
        touchless: {
            type: Boolean,
            default: true
        },
        hideDelimiters: {
            type: Boolean,
            default: true
        },
        cycle: {
            type: Boolean,
            default: false
        },
        cardState: {
            type: String,
            default: 'select'
        }
    },
    data() {
        return {
            carousel: 0,
            counter: 200,
            storemodel: this.$store.getters['app/candidate/model'],
            model: this.$store.getters['app/candidate/model'],
            propsContent: '',
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
            hashId: ''
        }
    },
    mounted() {
        this.hashId = this.displayCandidate[this.carousel].greetings[0].hash_id
    },
    computed: {
        displayCandidate() {
            const data = Array(...this.candidates)
            this.$forceUpdate() //強制更新
            return data
        }
    },
    watch: {
        carousel() {
            this.hashId = this.displayCandidate[
                this.carousel
            ].greetings[0].hash_id
            this.$emit('input', this.carousel)
        },
        carouselCount() {
            this.carousel = this.carouselCount
        },
        cardState() {
            if (this.cardState === 'edit') {
                this.propsContent = this.displayCandidate[
                    this.carousel
                ].greetings[0].content
            }
        }
    },
    methods: {
        /**
         * editorBtnからeditモード起動のコマンド受け取り
         * 親コンポーネントで受け取るデータとeditモードへの変更
         */
        assginState(state) {
            this.$emit('fromSelectComponent', state)
        },

        /**
         * 編集をセーブする関数
         *
         * もしhash_idが空なら新規投稿
         * もしhash_idがあれば更新
         */
        editSave(e) {
            // axiosの通信のあとでthisを参照できなくなるので、ここでやってしまう
            if (this.propsContent.trim() === '') return !1
            const self = this
            if (this.hashId) {
                this.$axios
                    .$put(`${process.env.apiBaseUrl}greetings`, {
                        greeting_hash: this.hashId,
                        content: this.propsContent
                    })
                    .then((_res) => {
                        self.$emit('returnEditFromChild', { _res })
                    })
            } else {
                this.$axios
                    .$post(`${process.env.apiBaseUrl}greetings`, {
                        content: this.propsContent
                    })
                    .then((_res) => {
                        self.$emit('returnEditFromChild', { _res })
                    })
            }
        },
        editCancel() {
            this.$emit('cancelEditFromChild')
        },
        HiClick() {
            alert(
                'クリックされました。データベースに送る処理は何も書いていません'
            )
        }
    }
}
</script>

<style>
.inline {
    /* transform: scale(1.2, 1.2); */
    display: inline-block;
    margin-bottom: 0 !important;
}
.SaveCancelBtn {
    margin: 0 auto;
}
.likebtn {
    margin: 0 auto;
}
</style>
