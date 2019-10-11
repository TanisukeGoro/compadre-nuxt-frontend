<template>
    <transition name="slide-up">
        <v-dialog v-if="dialog">
            <template v-slot:activator="{ on }">
                <v-btn outlined rounded color="#22A9E4" dark v-on="on"
                    >変更</v-btn
                >
            </template>

            <v-card>
                <v-toolbar max-width="600px" style="margin:0 auto;">
                    <v-btn
                        icon
                        @click="
                            dialog = false
                            editCancel()
                        "
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>変更</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    <v-toolbar-items>
                        <v-btn
                            text
                            @click="
                                dialog = false
                                editSave()
                            "
                            >Save</v-btn
                        >
                    </v-toolbar-items>
                </v-toolbar>
                <!--****************** ↓↓ 編集画面 ↓↓ ******************-->
                <v-carousel
                    height="100%"
                    :hide-delimiters="true"
                    :show-arrows="true"
                    :cycle="false"
                    :light="true"
                    :continuous="false"
                >
                    <v-carousel-item>
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
                                        User Name
                                    </v-list-item-title>
                                    <v-list-item-subtitle
                                        class="grey--text text--darken-1"
                                    >
                                        <p class="inline iti-flag jp mr-1"></p>
                                        日本 32歳
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle
                                        class="grey--text text--darken-1"
                                    >
                                        職業 / エンジニアとか
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-card-text
                                class="subtitle-1 grey--text text--darken-3"
                            >
                                夜だろうか」「おまた点つくしかいがおりようと思っていらしく、本をもう行った川へなんかくひょうせきが。
                            </v-card-text>

                            <v-divider color="grey"></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        class="subtitle-2 grey--text"
                                    >
                                        <v-icon class="mr-3 grey--text"
                                            >mdi-voice</v-icon
                                        >
                                        {{ 'JA' | langCode2langName }},
                                        {{ 'ES' | langCode2langName }},
                                        {{ 'SW' | langCode2langName }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-card-actions>
                                <v-flex xs1>
                                    <v-btn color="accent" absolute bottom>
                                        Hi !
                                    </v-btn>
                                </v-flex>
                            </v-card-actions>
                        </v-card>
                    </v-carousel-item>
                </v-carousel>
            </v-card>
            <!--****************** ↑↑ 編集画面 終了 ↑↑ ****************** -->
        </v-dialog>
    </transition>
</template>

<script>
import '@/assets/user-profile.css'
export default {
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: 'Untitle...' //
        },
        uicon: {
            type: String,
            default: '' // アイコンがからだった時の画像データを差し込んでおく。
        },
        like: {
            type: Number,
            default: 0
        },
        hashId: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: 'no text...'
        },
        mediaUrl: {
            type: String,
            default: ''
        },
        fstHashtag: {
            type: String,
            default: ''
        },
        sndHashtag: {
            type: String,
            default: ''
        },
        trdHashtag: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            counter: 200,
            props_content: this.content
        }
    },
    computed: {
        isDialog() {
            return this.dialog
        }
    },
    methods: {
        /**
         * 編集をセーブする関数
         *
         * もしhash_idが空なら新規投稿
         * もしhash_idがあれば更新
         */
        editSave(e) {
            // axiosの通信のあとでthisを参照できなくなるので、ここでやってしまう
            const self = this
            if (this.hashId) {
                this.$axios
                    .$put(`${process.env.apiBaseUrl}greetings`, {
                        greeting_hash: this.hashId,
                        content: this.props_content
                    })
                    .then((_res) => {
                        self.$emit('returnEditFromChild', { _res })
                    })
            } else {
                this.$axios
                    .$post(`${process.env.apiBaseUrl}greetings`, {
                        content: this.props_content
                    })
                    .then((_res) => {
                        self.$emit('returnEditFromChild', { _res })
                    })
            }
        },
        editCancel() {
            this.$emit('cancelEditFromChild')
        }
    }
}
</script>

<style scoped>
.card-text__font {
    font-size: 20px;
    font-weight: 580;
    line-height: 32px;
    color: #fff;
}
.v-textarea textarea {
    line-height: 32px;
}
.slide-up-enter-active {
    transition: all 2s ease;
}
.slide-up-leave-active {
    transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-up-enter,
.slide-fade-leave-to {
    transform: translateY(100vh);
    opacity: 0;
}
</style>
