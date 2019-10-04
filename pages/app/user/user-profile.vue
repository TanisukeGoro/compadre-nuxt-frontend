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
                            <div class="space">
                                <img
                                    :src="loginUserData.icon_url"
                                    class="user-main-img"
                                />
                            </div>
                            <!-- <div
                                class="user-img-space"
                                style="position:relative;"
                            > -->
                            <!-- <img
                                    :src="loginUserData.icon_url"
                                    class="user-main-img"
                                /> -->
                            <v-card-text font-weight-bold class="user-name">
                                <v-list-item-title class="headline mb-1">
                                    {{ name }}
                                </v-list-item-title>
                            </v-card-text>
                            <!-- </div> -->
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
                                            <div class="editspace">
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
                                        <div
                                            style="border-bottom: 1px solid rgba(0, 0, 0, 0.1);display:flex;margin:0 auto;width:600px;"
                                        >
                                            <div class="edti-row-label">
                                                自己紹介
                                            </div>
                                            <textarea
                                                v-model="editSelfIntroduction"
                                                name="勧誘文"
                                                class="edit-self-introduction"
                                                cols="50"
                                                rows="5"
                                            ></textarea>
                                            <!-- <input
                                                v-model="SelfIntroduction"
                                                class="edit-input"
                                                type="text"
                                            /> -->
                                        </div>
                                        <div class="edit-row">
                                            <label class="edti-row-label"
                                                >言語</label
                                            >
                                            <select
                                                v-model="editFst_lang"
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
                                            <select
                                                v-model="editSnd_lang"
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
                                                > </select
                                            ><!-- ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊ -->
                                            <select
                                                v-model="editTrd_lang"
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
                                            ><!-- ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊ -->
                                            <select
                                                v-model="editJob"
                                                class="selectFont"
                                            >
                                                <option
                                                    v-for="jobC in jobCodes"
                                                    :key="jobC.id"
                                                    :value="jobC.value"
                                                    selected="job"
                                                    >{{ jobC.text }}</option
                                                >
                                            </select>
                                        </div>
                                        <div
                                            class="edit-row"
                                            style="display:flex;height:50px"
                                        >
                                            <div class="edti-row-label">
                                                出身国
                                            </div>
                                            <!-- {{ editFrom }} -->
                                            <v-select
                                                v-model="editCountry"
                                                label="country"
                                                :items="countries"
                                                width="50px"
                                                item-value="iso2"
                                                item-text="name"
                                                class="caption"
                                            >
                                                <template
                                                    slot="selection"
                                                    slot-scope="{ item }"
                                                >
                                                    <p
                                                        class="inline iti-flag"
                                                        :class="
                                                            item.iso2.toLowerCase()
                                                        "
                                                    ></p>
                                                    {{ item.name }}
                                                </template>
                                                <template
                                                    slot="item"
                                                    slot-scope="{ item }"
                                                >
                                                    <p
                                                        class="inline iti-flag"
                                                        :class="
                                                            item.iso2.toLowerCase()
                                                        "
                                                    ></p>
                                                    {{ item.name }}
                                                </template>
                                            </v-select>
                                        </div>
                                        <!-- <div class="edit-row">
                                            <label class="edti-row-label"
                                                >現在地</label
                                            >
                                            <input
                                                v-model="presentLocation"
                                                class="edit-input"
                                                type="text"
                                            />
                                        </div> -->
                                    </v-card>
                                    <!--****************** ⬆︎⬆︎ 編集画面 終了 ⬆︎⬆︎ ****************** -->
                                </v-dialog>
                            </v-flex>
                        </v-layout>

                        <!-- ****************** ⬇︎⬇︎ 最初の画面のユーザー情報 ⬇︎︎︎︎︎︎︎︎︎︎⬇︎ ****************** -->
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
                                        >{{ job_conversion(job) }}
                                    </v-list-item-title>
                                    <!-- <v-list-item-title class="mb-1">
                                        <v-icon>mdi-home-outline</v-icon
                                        >{{ presentLocation }}
                                    </v-list-item-title> -->
                                    <v-list-item-title class="mb-1">
                                        <v-icon>mdi-voice</v-icon>
                                        {{ fst_lang | langCode2langName }}/{{
                                            snd_lang | langCode2langName
                                        }}/{{ trd_lang | langCode2langName }}
                                    </v-list-item-title>
                                    <v-list-item-title class="mb-1">
                                        <v-icon
                                            >mdi-account-star-outline</v-icon
                                        >
                                        {{ birthday | yyyymmdd2Age }}歳
                                    </v-list-item-title>
                                    <v-list-item-title class="mb-1">
                                        <v-icon>mdi-airballoon</v-icon>
                                        {{ country | countryCode2countryName }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                        <!-- ユーザーのgreeting -->
                        <div class="user-text pt-5 pr-4 pl-4 title">
                            {{ SelfIntroduction }}
                        </div>
                        <div class="greeting-toEdit">
                            <v-icon>mdi-file-document-edit-outline</v-icon>
                        </div>
                        <!--****************** ⬆︎⬆︎ 最初の画面のユーザー情報 終了 ⬆︎⬆︎ ****************** -->
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
import { countries } from '~/plugins/phoneCodeCountries'
import BottomNav from '~/components/BottomNav'
import CheckProfile from '~/components/CheckProfile'
export default {
    components: {
        BottomNav,
        CheckProfile
    },
    data() {
        return {
            loginUserData: this.$auth.$state.user,
            countries,
            // 編集のデータ
            storeUserData: '',
            editName: '',
            editJob: '',
            editBirthday: '',
            editYear: 1995,
            editMonth: '',
            editDay: '',
            editPresentLocation: '',
            editSelfIntroduction: '',
            editFst_lang: '',
            editSnd_lang: '',
            editTrd_lang: '',
            editCountry: '',
            // プロフィールに表示するデータ
            name: '',
            job: '',
            birthday: '',
            presentLocation: '',
            langage: '',
            country: '',
            SelfIntroduction: '',
            fst_lang: '',
            snd_lang: '',
            trd_lang: '',
            // greetingsのカウントバー
            page: 1,
            color: 'black',
            greetinglength: 3,
            // スライドの設定
            dialog: false,
            notifications: false,
            light: true,
            delimiters: true,
            // sound: true, // これはなんぞや？
            widgets: false,
            showArrows: false,
            model: 0,

            langageCode: {
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
            jobCodes: [
                { text: '事務・オフィス系', value: 1 },
                { text: '販売・飲食・サービス系', value: 2 },
                { text: 'IT・エンジニア系', value: 3 },
                { text: 'Web・クリエイター系', value: 4 },
                { text: '医療・介護・福祉系', value: 5 },
                { text: '研究機関・教育系', value: 6 },
                { text: '商社・金融・経営', value: 7 },
                { text: '学生', value: 8 }
            ],
            fst_langages: [
                { text: '---', value: 'non' },
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
            snd_langages: [],
            trd_langages: []
        }
    },
    async mounted() {
        Object.assign(this.snd_langages, this.fst_langages)
        Object.assign(this.trd_langages, this.fst_langages)
        await this.getLoginUser() // ログインしているユーザーの情報をstoreにもたせる

        this.storeUserData = this.$store.getters['comman/auth/data'] // storeのユーザー情報をstoreUserDataに持たせる
        console.log('storeUserData', this.storeUserData)

        this.editName = this.storeUserData.user.name
        this.editJob = this.storeUserData.user.job_type
        this.editBirthday = this.storeUserData.user.birthday
        // this.editPresentLocation = 'nodata' //現在地は今のところ表示させない
        this.editSelfIntroduction = this.storeUserData.user.profile_text
        this.editFst_lang = 'zh'
        // this.editFst_lang = this.storeUserData.user.fst_lang
        this.editSnd_lang = this.storeUserData.user.snd_lang
        this.editTrd_lang = this.storeUserData.user.trd_lang
        this.editCountry = this.storeUserData.user.country

        this.name = this.storeUserData.user.name
        this.job = this.storeUserData.user.job_type
        this.birthday = this.storeUserData.user.birthday
        // this.presentLocation = 'NULL' //現在地は今のところ表示させない
        this.SelfIntroduction = this.storeUserData.user.profile_text
        this.fst_lang = 'zh'
        // this.fst_lang = this.storeUserData.user.fst_lang
        this.snd_lang = this.storeUserData.user.snd_lang
        this.trd_lang = this.storeUserData.user.trd_lang
        this.country = this.storeUserData.user.country
    },
    methods: {
        editSave() {
            this.name = this.editName
            this.job = this.editJob
            this.SelfIntroduction = this.editSelfIntroduction
            this.fst_lang = this.editFst_lang
            this.snd_lang = this.editSnd_lang
            this.trd_lang = this.editTrd_lang
            this.country = this.editCountry
            this.$auth.$storage.setState('user', this.editName)
            console.log(this.fst_lang, this.snd_lang, this.trd_lang)
            this.$axios
                .$put(`${process.env.apiBaseUrl}user`, {
                    name: this.editName,
                    job_type: this.editJob,
                    profile_text: this.SelfIntroduction,
                    fst_lang: this.editFst_lang,
                    snd_lang: this.editSnd_lang,
                    trd_lang: this.editTrd_lang,
                    country: this.editCountry
                })
                .then((i) => console.log(i))
        },
        editCancel() {
            this.editName = this.name
            this.editJob = this.job
            this.editSelfIntroduction = this.SelfIntroduction
            this.editFst_lang = this.fst_lang
            this.editSnd_lang = this.snd_lang
            this.editTrd_lang = this.trd_lang
            this.country = this.editCountry
        },
        ...mapActions('comman/auth', ['getLoginUser']),
        ...mapState('comman/auth', ['data']),
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
        job_conversion(job) {
            return this.jobCode[job]
        },
        lang_conversion(lang) {
            if (this.langageCode[lang]) {
                return this.langageCode[lang]
            } else {
                return ''
            }
        }
    }
}
</script>
