<template>
    <div style="height:100%;">
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
                            :src="
                                $options.filters.avatarIconUrl(
                                    this.$auth.$state.user.icon_url
                                )
                            "
                            class="user-main-img"
                        />
                    </div>
                    <v-card-text font-weight-bold class="user-name">
                        <v-list-item-title class="headline mb-1">
                            {{ userData.name }}
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
                                    @click="startUpEditor"
                                    >変更</v-btn
                                >
                            </template>
                            <!--****************** ↓↓ 編集画面 ↓↓ ******************-->
                            <v-card max-width="600" style="margin:0 auto;">
                                <v-toolbar
                                    color="primary"
                                    class="white--text"
                                    max-width="600px"
                                    style="margin:0 auto;"
                                >
                                    <v-btn
                                        class="white--text"
                                        icon
                                        :color="color"
                                        @click="dialog = false"
                                    >
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-toolbar-title
                                        >Edit Profile</v-toolbar-title
                                    >
                                    <div class="flex-grow-1"></div>
                                    <v-toolbar-items>
                                        <v-btn
                                            text
                                            :color="color"
                                            class="white--text"
                                            @click="editSave()"
                                            >Save</v-btn
                                        >
                                    </v-toolbar-items>
                                </v-toolbar>
                                <v-flex
                                    max-width="600px"
                                    style="margin:0 auto;"
                                >
                                    <div class="editspace">
                                        <v-avatar
                                            class="profile user-main-img"
                                            color="grey"
                                            size="74"
                                            @click="
                                                editProfilePhotoDialog = !editProfilePhotoDialog
                                            "
                                        >
                                            <v-img
                                                :lazy-src="
                                                    $options.filters.avatarIconUrl(
                                                        this.$auth.$state.user
                                                            .icon_url
                                                    )
                                                "
                                            >
                                                <template v-slot:placeholder>
                                                    <v-row
                                                        class="fill-height ma-0"
                                                        align="center"
                                                        justify="center"
                                                    >
                                                        <v-icon
                                                            color="white"
                                                            size="30"
                                                            >mdi-camera-enhance-outline</v-icon
                                                        >
                                                    </v-row>
                                                </template>
                                            </v-img>
                                        </v-avatar>
                                    </div>
                                </v-flex>
                                <div
                                    style="position: absolute; width: 140px; text-align: end;"
                                >
                                    <v-dialog
                                        v-model="editProfilePhotoDialog"
                                        width="500"
                                    >
                                        <v-card>
                                            <edit-profile-img
                                                @cancelProfileImg="
                                                    editProfilePhotoDialog = !editProfilePhotoDialog
                                                "
                                            />
                                        </v-card>
                                    </v-dialog>
                                </div>
                                <div
                                    class="edit-row"
                                    style="height:50px;border-bottom:1px solid rgba(0,0,0,0.1)"
                                ></div>
                                <v-card-text>
                                    <!-- Name -->
                                    <v-row>
                                        <v-col cols="3" class="pa-0">
                                            <v-subheader class="px-0"
                                                >Name</v-subheader
                                            >
                                        </v-col>
                                        <v-col cols="9" class="pa-0">
                                            <v-text-field
                                                v-model="editorParam.name"
                                                class="pt-0"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <!-- Profile -->
                                    <v-row>
                                        <v-col cols="3" class="pa-0">
                                            <v-subheader class="px-0"
                                                >Profile</v-subheader
                                            >
                                        </v-col>
                                        <v-col cols="9" class="pa-0">
                                            <v-textarea
                                                v-model="
                                                    editorParam.profile_text
                                                "
                                                class="pt-0"
                                            ></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <!-- Languages -->
                                    <v-row>
                                        <v-col cols="3" class="pa-0">
                                            <v-subheader class="px-0"
                                                >Languages</v-subheader
                                            >
                                        </v-col>
                                        <v-col cols="9" class="pa-0">
                                            <v-select
                                                v-model="langages"
                                                :items="minLangCodes"
                                                item-value="iso639_1"
                                                item-text="local"
                                                :menu-props="{
                                                    top: true,
                                                    offsetY: true
                                                }"
                                                label="max three languages"
                                                class="caption mt-0 pt-0"
                                                attach
                                                chips
                                                multiple
                                                @input="limiter"
                                            >
                                                <template
                                                    slot="selection"
                                                    slot-scope="{ item }"
                                                >
                                                    <p
                                                        class="inline iti-flag"
                                                        :class="
                                                            item.iso639_1.toLowerCase()
                                                        "
                                                    ></p>
                                                    {{ item.local }}
                                                </template>
                                                <template
                                                    slot="item"
                                                    slot-scope="{ item }"
                                                >
                                                    <p
                                                        class="inline iti-flag"
                                                        :class="
                                                            item.iso639_1.toLowerCase()
                                                        "
                                                    ></p>
                                                    {{ item.local }}
                                                </template>
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <!-- Country -->
                                    <v-row>
                                        <v-col cols="3" class="pa-0">
                                            <v-subheader class="px-0 pb-4"
                                                >Country</v-subheader
                                            >
                                        </v-col>
                                        <v-col cols="9" class="pa-0">
                                            <v-select
                                                v-model="country"
                                                label="country"
                                                :items="countriesName"
                                                item-value="iso2"
                                                item-text="name"
                                                class="caption mt-0 pt-0"
                                                return-object
                                                @input="
                                                    editorParam.country =
                                                        country.iso2
                                                "
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
                                        </v-col>
                                    </v-row>
                                </v-card-text>
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
                            <v-list-item class="mb-1 px-0">
                                <v-chip-group column>
                                    <v-chip
                                        class="ma-1 caption"
                                        color="chips"
                                        text-color="chipsColor"
                                        draggable
                                    >
                                        <v-avatar left class="mr-0">
                                            <v-icon class="body-1">
                                                mdi-briefcase-outline
                                            </v-icon>
                                        </v-avatar>
                                        {{
                                            userData.job_type | jobCode2JobName
                                        }}
                                    </v-chip>
                                    <v-chip
                                        class="ma-1 caption"
                                        color="chips"
                                        text-color="chipsColor "
                                    >
                                        <v-avatar left class="mr-0">
                                            <v-icon class="body-1">
                                                mdi-voice
                                            </v-icon>
                                        </v-avatar>
                                        {{
                                            userData.fst_lang
                                                | langCode2langName
                                        }}/{{
                                            userData.snd_lang
                                                | langCode2langName
                                        }}/{{
                                            userData.trd_lang
                                                | langCode2langName
                                        }}
                                    </v-chip>
                                    <v-chip
                                        class="ma-1 caption"
                                        color="chips"
                                        text-color="chipsColor "
                                    >
                                        <v-avatar left class="mr-0">
                                            <v-icon class="body-1">
                                                mdi-cake
                                            </v-icon>
                                        </v-avatar>
                                        {{ userData.birthday | yyyymmdd2Age }}歳
                                    </v-chip>
                                    <v-chip
                                        class="ma-1 caption"
                                        color="chips"
                                        text-color="chipsColor "
                                    >
                                        <v-avatar left class="mr-0">
                                            <v-icon class="body-1">
                                                mdi-airballoon
                                            </v-icon>
                                        </v-avatar>
                                        {{
                                            userData.country
                                                | countryCode2countryName
                                        }}
                                    </v-chip>
                                </v-chip-group>
                            </v-list-item>
                            <!-- <v-list-item-title class="mb-1">
                                        <v-icon>mdi-home-outline</v-icon
                                        >{{ presentLocation }}
                                    </v-list-item-title> -->
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
                <!-- ユーザーのgreeting -->
                <div class="user-text pt-5 pr-4 pl-4 title">
                    <div
                        v-for="(paragraph, index) in SelfIntroduction.split(
                            '\n'
                        )"
                        :key="index"
                    >
                        {{ paragraph }}
                    </div>
                </div>
                <!--****************** ⬆︎⬆︎ 最初の画面のユーザー情報 終了 ⬆︎⬆︎ ****************** -->
                <BottomNav />
            </v-flex>
        </v-card>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import '@/assets/user-profile.css'
import { countriesName } from '~/plugins/phoneCodeCountries'
import { minLangCodes } from '~/plugins/langCode'
import EditProfileImg from '~/components/settings/EditProfileImg.vue'

import BottomNav from '~/components/BottomNav'
// import CheckProfile from '~/components/CheckProfile'
export default {
    components: {
        BottomNav,
        EditProfileImg
    },
    data() {
        return {
            loginUserData: this.$auth.$state.user,
            // 国籍データ
            countriesName,
            // 言語データ
            minLangCodes,
            langages: [],

            // 編集のデータ
            editorParam: '',
            // 表示用で0た
            userData: '',

            SelfIntroduction: '',
            userLangages: [],
            country: '',
            // greetingsのカウントバー
            color: 'black',
            // スライドの設定
            dialog: false,
            editProfilePhotoDialog: false
        }
    },
    asyncData({ params, $auth }) {
        return {
            userData: JSON.parse(JSON.stringify($auth.state.user))
        }
    },
    mounted() {
        // 編集データの設定
        this.editorParam = Object.assign({}, this.userData)
        // countryの初期値設定
        const results =
            countriesName.find(
                (i) => i.iso2 === this.userData.country.toUpperCase()
            ) || null
        this.country = results || ''

        // 言語の初期設定
        this.langages = [
            this.searchLang(this.userData.fst_lang),
            this.searchLang(this.userData.snd_lang),
            this.searchLang(this.userData.trd_lang)
        ]
        this.langages = this.langages.filter((i) => i !== ' -- ')
        // プロフィールがnullの時は以下を表示
        this.userData.profile_text === null
            ? (this.SelfIntroduction =
                  '右上の"変更"ボタンから自己紹介の文を書いてみましょう！！')
            : (this.SelfIntroduction = this.userData.profile_text)
        if (this.userData.country !== null) {
            this.country =
                countriesName.find(
                    (i) => i.iso2 === this.userData.country.toUpperCase()
                ) || null
        }
    },
    methods: {
        ...mapActions('comman/auth', ['getLoginUser']),
        ...mapState('comman/auth', ['data']),
        // 第三言語まで選択できるようにする
        limiter(e) {
            if (e.length > 3) {
                e.pop()
            }
            // データの更新処理
            this.editorParam.fst_lang =
                this.langages.length >= 1 ? this.langages[0] : null
            this.editorParam.snd_lang =
                this.langages.length >= 2 ? this.langages[1] : null
            this.editorParam.trd_lang =
                this.langages.length >= 3 ? this.langages[2] : null
        },
        searchLang(langCode) {
            if (langCode === null) return ' -- '
            const results =
                minLangCodes.find(
                    (i) => i.iso639_1 === langCode.toUpperCase()
                ) || null
            return results || ''
        },
        startUpEditor() {
            this.editorParam = Object.assign({}, this.userData)
        },
        editSave() {
            const self = this
            this.$axios
                .$put(`${process.env.apiBaseUrl}user`, { ...this.editorParam })
                .then((i) => {
                    self.userData = Object.assign({}, i.user)
                    self.SelfIntroduction = i.user.profile_text
                        ? i.user.profile_text
                        : '右上の"変更"ボタンから自己紹介の文を書いてみましょう！！'
                    self.dialog = false
                })
                .catch(
                    // エラー時の処理を記述する
                    (self.dialog = false)
                )
        }
    }
}
</script>

<style>
.v-image__image--cover {
    -webkit-filter: blur(0.5px);
    filter: blur(0.5px);
}
</style>
