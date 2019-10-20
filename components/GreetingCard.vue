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
        <v-content style="padding-bottom:90px">
            <v-carousel
                v-model="carousel"
                height="100%"
                :hide-delimiters="true"
                :show-arrows="false"
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
                        max-width="344"
                        class="mx-auto"
                        style="margin-top:5%; border-radius:25px; min-height:85% "
                        flat
                        outlined
                    >
                        <!-- 表示用 -->
                        <v-card-text
                            v-if="
                                cardState === 'select' ||
                                    cardState === 'preview'
                            "
                            style="font-size: 24px; line-height: 1.5;"
                            >{{
                                candidate.greetings.length > 0
                                    ? candidate.greetings[0].content
                                    : 'No Messages...'
                            }}</v-card-text
                        >
                        <v-card-text>
                            <v-icon class="mr-3 grey--text">mdi-voice</v-icon>
                            {{ candidate.fst_lang | langCode2langName }},
                            {{ candidate.snd_lang | langCode2langName }},
                            {{ candidate.trd_lang | langCode2langName }}
                        </v-card-text>

                        <v-card-text class="pa-0">
                            <div style="bottom:0px; position:absolute">
                                <v-divider></v-divider>
                                <v-list-item>
                                    <v-list-item-avatar
                                        color="#c6e9e2"
                                        size="50"
                                    >
                                        <v-img
                                            :src="
                                                candidate.icon_url
                                                    | avatarIconUrl
                                            "
                                            :lazy-src="
                                                require('~/assets/images/onErrorUserImg.png')
                                            "
                                        >
                                            <template v-slot:placeholder>
                                                <v-row
                                                    class="fill-height ma-0"
                                                    align="center"
                                                    justify="center"
                                                >
                                                    <v-progress-circular
                                                        indeterminate
                                                        color="white"
                                                        size="20"
                                                    ></v-progress-circular>
                                                </v-row>
                                            </template>
                                        </v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            class="subtitle-1 grey--text text--darken-3"
                                            >{{
                                                candidate.name
                                            }}</v-list-item-title
                                        >
                                        <v-list-item-subtitle
                                            class="grey--text text--darken-1"
                                        >
                                            <p
                                                class="inline iti-flag mr-1"
                                                :class="
                                                    candidate.country.toLowerCase()
                                                "
                                            >
                                                {{
                                                    candidate.country
                                                        | countryCode2countryName
                                                }}
                                                {{
                                                    candidate.birthday
                                                        | yyyymmdd2Age
                                                }}歳
                                            </p>
                                        </v-list-item-subtitle>
                                        <v-list-item-subtitle
                                            class="grey--text text--darken-1"
                                        >
                                            {{
                                                candidate.job_type
                                                    | jobCode2JobName
                                            }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </div>
                        </v-card-text>

                        <!-- 編集用 -->
                        <v-form>
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
                                :rules="rules"
                                rows="1"
                            >
                            </v-textarea>
                        </v-form>

                        <v-card-actions>
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

                    <span v-if="cardState === 'select'" class="likebtn">
                        <LikeButton
                            :btn-state="postBtnState"
                            @ClickLikebutton="clickHiBtn"
                        />
                    </span>
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
            default: false
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
            rules: [
                (v) => v === null || v.length <= 200 || 'Max 200 characters'
            ],
            storemodel: this.$store.getters['app/candidate/model'],
            model: this.$store.getters['app/candidate/model'],
            propsContent: '',
            hashId: '',
            postBtnState: true,
            nextState: true,
            iconBaseUrl: process.env.AwsStoreImageUrl
        }
    },
    mounted() {
        if (this.displayCandidate.length === 0) return
        if (this.displayCandidate[this.carousel].greetings.length === 0) return
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
            if (this.propsContent.trim().length > 200) {
                alert('Max 200 characters')
                return !1
            }
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
        clickHiBtn() {
            if (this.postBtnState === true)
                this.likeUser(this.displayCandidate[this.carousel].id)
        },
        /**
         * ユーザーによるいいねをPOSTしてる。
         * nuxtStateで連打による誤作動を防止している。
         */
        async postUserLike(LikedID) {
            this.postBtnState = false
            try {
                await this.$axios.$post(
                    `${process.env.apiBaseUrl}matching/like`,
                    {
                        userId_you: this.displayCandidate[this.carousel].id
                    }
                )
                this.postBtnState = true
            } catch (error) {
                this.postBtnState = true
            }
        },
        async matchingUser(LikedID) {
            try {
                await this.$axios.$post(`${process.env.apiBaseUrl}matching`, {
                    userId_you: LikedID
                })
            } catch (error) {}
        },
        /**
         * ユーザーのいいねのPOSTが完了してから次のユーザーを呼び出す。
         */
        likeUser(LikedID) {
            console.log(
                'likeUser',
                this.displayCandidate[this.carousel].has_user_voted
            )
            if (this.displayCandidate[this.carousel].has_user_voted) {
                console.log('matchinguser')
                this.matchingUser(LikedID)
            }
            this.postUserLike(LikedID)
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
    z-index: 100;
    /* position: fixed; */
    left: 25%;
    bottom: 50px;
    /* -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    overflow: hidden; */
    /* margin: 0 auto;*/
}
</style>
