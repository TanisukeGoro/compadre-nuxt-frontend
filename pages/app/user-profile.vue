<template>
    <div style="height:100%;">
        <v-carousel
            v-model="model"
            :light="light"
            :hide-delimiters="delimiters"
            :show-arrows="showArrows"
            height="100%"
        >
            <v-carousel-item>
                <v-card
                    style="margin:0 auto;background-color:white;position:relative;width:500px;height:100%;"
                    flat
                >
                    <v-flex
                        style="margin:0 auto;background-color:white;position:relative;"
                    >
                        <!-- ↓背景写真、ユーザーアイコン、name -->
                        <v-flex xs12 sm12>
                            <v-img
                                max-width="600px"
                                src="https://picsum.photos/id/11/500/300"
                            ></v-img>
                            <div
                                class="user-img-space"
                                style="position:relative;"
                            >
                                <img
                                    :src="loginUserData.icon_url"
                                    class="user-main-img"
                                />
                                <v-card-text font-weight-bold class="user-name">
                                    <v-list-item-title class="headline mb-1">
                                        {{ name }}
                                    </v-list-item-title>
                                </v-card-text>
                            </div>
                        </v-flex>
                        <!-- ↑背景写真、ユーザーアイコン、name -->
                        <v-layout justify-center style="text-align:center;">
                            <v-flex xs6>
                                <v-btn text color="primary">フレンド</v-btn>
                            </v-flex>
                            <v-flex xs6></v-flex>
                            <v-flex xs6>
                                <!-- <v-btn outlined color="#22A9E4" rounded>変更</v-btn> -->
                                <v-dialog
                                    v-model="dialog"
                                    fullscreen
                                    hide-overlay
                                    transition="dialog-bottom-transition"
                                    max-width="600px"
                                    style="margin:0 auto;"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            outlined
                                            rounded
                                            color="#22A9E4"
                                            dark
                                            v-on="on"
                                            >変更</v-btn
                                        >
                                    </template>
                                    <!--****************** ↓↓ 編集画面 ↓↓ ******************-->
                                    <v-card
                                        max-width="600px"
                                        style="margin:0 auto;"
                                    >
                                        <v-toolbar
                                            max-width="600px"
                                            style="margin:0 auto;"
                                        >
                                            <v-btn
                                                icon
                                                :color="color"
                                                @click="
                                                    dialog = false
                                                    editCancel()
                                                "
                                            >
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                            <v-toolbar-title
                                                >変更</v-toolbar-title
                                            >
                                            <div class="flex-grow-1"></div>
                                            <v-toolbar-items>
                                                <v-btn
                                                    text
                                                    :color="color"
                                                    @click="
                                                        dialog = false
                                                        editSave()
                                                    "
                                                    >Save</v-btn
                                                >
                                            </v-toolbar-items>
                                        </v-toolbar>
                                        <v-flex
                                            max-width="600px"
                                            style="margin:0 auto;"
                                        >
                                            <v-img
                                                max-width="600px"
                                                style="margin:0 auto;"
                                                src="https://picsum.photos/id/11/500/300"
                                            ></v-img>
                                            <div
                                                class="user-img-space"
                                                style="position:relative;"
                                            >
                                                <img
                                                    :src="
                                                        loginUserData.icon_url
                                                    "
                                                    class="user-main-img"
                                                />
                                            </div>
                                        </v-flex>
                                        <div
                                            class="edit-row"
                                            style="height:50px;border-bottom:1px solid rgba(0,0,0,0.1)"
                                        ></div>
                                        <div class="edit-row">
                                            <label class="edti-row-label"
                                                >名前</label
                                            >
                                            <input
                                                v-model="editName"
                                                class="edit-input"
                                                type="text"
                                            />
                                        </div>
                                        <div class="edit-row">
                                            <label class="edti-row-label"
                                                >自己紹介</label
                                            >
                                            <input
                                                v-model="SelfIntroduction"
                                                class="edit-input"
                                                type="text"
                                            />
                                        </div>
                                        <div class="edit-row">
                                            <label class="edti-row-label"
                                                >言語</label
                                            >
                                            <span>{{ fst_lang }}</span>
                                            <select
                                                v-model="fst_lang"
                                                class="selectFont"
                                            >
                                                <option
                                                    v-for="fst_langage in fst_langages"
                                                    :key="fst_langage.id"
                                                    :value="fst_langage.value"
                                                    selected="fst_lang"
                                                    >{{
                                                        fst_langage.text
                                                    }}</option
                                                >
                                            </select>
                                            <span>{{ snd_lang }}</span>
                                            <select
                                                v-model="snd_lang"
                                                class="selectFont"
                                            >
                                                <option
                                                    v-for="snd_langage in snd_langages"
                                                    :key="snd_langage.id"
                                                    :value="snd_langage.value"
                                                    selected="snd_lang"
                                                    >{{
                                                        snd_langage.text
                                                    }}</option
                                                >
                                            </select>
                                            <span>{{ trd_lang }}</span>
                                            <select
                                                v-model="trd_lang"
                                                class="selectFont"
                                            >
                                                <option
                                                    v-for="trd_langage in trd_langages"
                                                    :key="trd_langage.id"
                                                    :value="trd_langage.value"
                                                    selected="trd_lang"
                                                    >{{
                                                        trd_langage.text
                                                    }}</option
                                                >
                                            </select>
                                            <!-- <v-select
                                                :items="items"
                                                label="Solo field"
                                                solo
                                            ></v-select> -->
                                        </div>
                                        <div class="edit-row">
                                            <label class="edti-row-label"
                                                >仕事</label
                                            >
                                            <input
                                                v-model="job"
                                                class="edit-input"
                                                type="text"
                                            />
                                        </div>
                                        <div class="edit-row">
                                            <label class="edti-row-label"
                                                >生年月日</label
                                            >
                                            <input
                                                v-model="birthday"
                                                class="edit-input"
                                                type="text"
                                            />
                                        </div>
                                        <div class="edit-row">
                                            <label class="edti-row-label"
                                                >出身国</label
                                            >
                                            <input
                                                v-model="from"
                                                class="edit-input"
                                                type="text"
                                            />
                                        </div>
                                        <div class="edit-row">
                                            <label class="edti-row-label"
                                                >現在地</label
                                            >
                                            <input
                                                v-model="presentLocation"
                                                class="edit-input"
                                                type="text"
                                            />
                                        </div>
                                    </v-card>
                                    <!--****************** ↑↑ 編集画面 終了 ↑↑ ****************** -->
                                </v-dialog>
                            </v-flex>
                        </v-layout>

                        <!-- 最初の画面のユーザー情報 -->
                        <v-card
                            class="mx-auto mt-9 ml-0 mr-0 overline"
                            max-width="600"
                            flat
                            style="border-bottom:1px solid rgba(0,0,0,0.2);border-top:1px solid rgba(0,0,0,0.2);"
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="mb-1">
                                        <v-icon
                                            >mdi-account-card-details-outline</v-icon
                                        >仕事のデータがない
                                    </v-list-item-title>
                                    <v-list-item-title class="mb-1">
                                        <v-icon>mdi-home-outline</v-icon
                                        >現在地のデータがない
                                    </v-list-item-title>
                                    <v-list-item-title class="mb-1">
                                        <v-icon>mdi-voice</v-icon>
                                        {{ loginUserData.fst_lang }}/{{
                                            loginUserData.snd_lang
                                        }}/{{ loginUserData.trd_lang }}
                                    </v-list-item-title>
                                    <v-list-item-title class="mb-1">
                                        <v-icon
                                            >mdi-account-star-outline</v-icon
                                        >
                                        {{ loginUserData.birthday }}歳
                                    </v-list-item-title>
                                    <v-list-item-title class="mb-1">
                                        <v-icon>mdi-airballoon</v-icon>
                                        {{ loginUserData.country_id }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                        <!-- ユーザーのgreeting -->
                        <div class="user-text pt-5 pr-4 pl-4 title">
                            草しばらく、立ってお祈いのだ。こっちを見ているかもとれなようするといわになるほど激はげしく列れつは。
                            春はあけぼのやうやう白く成りゆく山際少しあかりて白くたなびきたる
                        </div>
                        <div class="text-center">
                            <v-pagination
                                v-model="page"
                                :length="greetinglength"
                                circle
                            ></v-pagination>
                        </div>
                        <div class="greeting-toEdit">
                            <v-icon>mdi-file-document-edit-outline</v-icon>
                        </div>
                        <BottomNav />
                    </v-flex>
                </v-card>
            </v-carousel-item>
            <v-carousel-item>
                <CheckProfile />
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import '@/assets/user-profile.css'
import BottomNav from '~/components/BottomNav'
import CheckProfile from '~/components/CheckProfile'
export default {
    layout: 'empty',
    components: {
        BottomNav,
        CheckProfile
    },
    data() {
        return {
            // 編集のデータ
            storeUserData: '',
            editName: '',
            editJob: '',
            editBirthday: '',
            editPresentLocation: '',
            editFrom: '',
            editSelfIntroduction: '',
            name: this.$auth.$state.user.name,
            job: this.$auth.$state.user,
            birthday: this.$auth.$state.user.birthday,
            presentLocation: this.$auth.$state.user,
            langage: this.$auth.$state.user,
            from: this.$auth.$state.user,
            SelfIntroduction: this.$auth.$state.user,
            // greetingsのカウントバー
            page: 1,
            color: 'black',
            greetinglength: 3,
            loginUserData: this.$auth.$state.user,
            // スライドの設定
            dialog: false,
            notifications: false,
            light: true,
            delimiters: true,
            // sound: true, // これはなんぞや？
            widgets: false,
            showArrows: false,
            model: 0,
            // selectの選択項目
            fst_lang: 'th', // テスト
            snd_lang: 'tl', // テスト
            trd_lang: 'en', // テスト
            // fst_lang: this.$auth.state.user.fst_lang,
            // snd_lang: this.$auth.state.user.snd_lang,
            // trd_lang: this.$auth.state.user.trd_lang,
            fst_langages: [
                { text: '日本語', value: 'ja' },
                { text: '中国語', value: 'zh' },
                { text: '英語', value: 'en' },
                { text: 'ロシア語', value: 'be' },
                { text: 'ポルトガル語', value: 'pt' },
                { text: 'スペイン語', value: 'es' },
                { text: 'フランス語', value: 'fr' },
                { text: 'ドイツ語', value: 'de' },
                { text: 'イタリア語', value: 'it' },
                { text: 'マレー語', value: 'ms' },
                { text: 'フィリピン語', value: 'tl' },
                { text: 'ベトナム語', value: 'vi' },
                { text: 'タイ語', value: 'th' },
                { text: '台湾語', value: 'tw' }
            ],
            snd_langages: [
                { text: '日本語' },
                { text: '中国語', value: 'zh' },
                { text: '英語', value: 'en' },
                { text: 'ロシア語', value: 'be' },
                { text: 'ポルトガル語', value: 'pt' },
                { text: 'スペイン語', value: 'es' },
                { text: 'フランス語', value: 'fr' },
                { text: 'ドイツ語', value: 'de' },
                { text: 'イタリア語', value: 'it' },
                { text: 'マレー語', value: 'ms' },
                { text: 'フィリピン語', value: 'tl' },
                { text: 'ベトナム語', value: 'vi' },
                { text: 'タイ語', value: 'th' },
                { text: '台湾語', value: 'tw' }
            ],
            trd_langages: [
                { text: '日本語' },
                { text: '中国語', value: 'zh' },
                { text: '英語', value: 'en' },
                { text: 'ロシア語', value: 'be' },
                { text: 'ポルトガル語', value: 'pt' },
                { text: 'スペイン語', value: 'es' },
                { text: 'フランス語', value: 'fr' },
                { text: 'ドイツ語', value: 'de' },
                { text: 'イタリア語', value: 'it' },
                { text: 'マレー語', value: 'ms' },
                { text: 'フィリピン語', value: 'tl' },
                { text: 'ベトナム語', value: 'vi' },
                { text: 'タイ語', value: 'th' },
                { text: '台湾語', value: 'tw' }
            ]
        }
    },
    async mounted() {
        // この⬇︎２行は auth moduleのデータをストアに突っ込んでいるが、よく考えたら、それではauthの情報は更新されることはないので、一旦コメントアウト
        // const loginUserData = this.$auth.$state.user
        // this.$store.commit('comman/auth/loginUserData', loginUserData)
        // ⬇２行のコードは上で突っ込んだstoreのdataを取ってきて変数に持たせている
        // this.storeUserData = this.$store.getters['comman/auth/data']
        // this.editName = this.storeUserData.name
        await this.getLoginUser()

        this.storeUserData = this.$store.getters['comman/auth/data']
        this.editName = this.storeUserData
        console.log(this.storeUserData.user.name, 'ddd')
    },
    methods: {
        editSave() {
            this.name = this.editName
            // this.$auth.state.user.name = this.editName
            this.$auth.$storage.setState('user', this.editName)
        },
        editCancel() {
            this.editName = this.name
        },
        ...mapActions('comman/auth', ['getLoginUser']),
        ...mapState('comman/auth', ['data'])
    }
}
</script>
