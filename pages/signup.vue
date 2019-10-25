<script>
/**
 *
 * エラー時にsubmitのloadingをfalseにしてエラー個所を表示
 *
 *
 */
</script>
<template>
    <v-app>
        <script src="//connect.facebook.net/en_US/sdk.js"></script>
        <v-content>
            <!-- <v-btn color="success" @click="test">text</v-btn>
            {{ phoneNumber == undefined || phoneNumber.isValid() }} -->
            <v-form ref="form" v-model="form">
                <v-stepper v-model="e1">
                    <v-stepper-header>
                        <template v-for="n in steps">
                            <v-stepper-step
                                :key="`${n}-step`"
                                :complete="e1 > n"
                                :step="n"
                                editable
                            >
                                Step {{ n }}
                            </v-stepper-step>

                            <v-divider v-if="n !== steps" :key="n"></v-divider>
                        </template>
                    </v-stepper-header>

                    <v-stepper-items>
                        <!-- 登録ページ 1 Facebook認証 -->
                        <v-stepper-content :key="`1-content`" :step="1">
                            <v-card
                                title="Social Login"
                                bg-variant="light"
                                class="p-2"
                            >
                                <v-list>
                                    <v-list-item-group color="primary">
                                        <v-list-item
                                            v-for="auth in strategies"
                                            :key="auth.key"
                                        >
                                            <v-list-item-icon>
                                                <v-icon
                                                    >mdi-{{ auth.icon }}</v-icon
                                                >
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    <v-btn
                                                        block
                                                        :style="{
                                                            background:
                                                                auth.color
                                                        }"
                                                        class="login-button white--text"
                                                        @click="
                                                            signupWithFacebook
                                                        "
                                                    >
                                                        Singup with
                                                        {{ auth.name }}
                                                    </v-btn>
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-card>
                        </v-stepper-content>
                        <!-- 登録ページ 2 -->
                        <v-stepper-content :key="`2-content`" :step="2">
                            <v-card class="mb-12" flat>
                                <v-text-field
                                    v-model="name"
                                    :rules="nameRules"
                                    disabled
                                    :counter="20"
                                    label="Your name"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    disabled
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    :append-icon="
                                        showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                    "
                                    :rules="[rules.required, rules.min]"
                                    :type="showPassword ? 'text' : 'password'"
                                    name="input-10-2"
                                    label="password"
                                    hint="At least 8 characters"
                                    class="input-group--focused"
                                    @click:append="showPassword = !showPassword"
                                ></v-text-field>
                            </v-card>
                            <v-card class="mb-12 container" flat>
                                <!-- 画像のアップロード -->
                                <croppa
                                    v-model="croppaImg"
                                    :width="150"
                                    :placeholder-font-size="16"
                                    placeholder="Account Image"
                                    :prevent-white-space="true"
                                    :initial-image="initUserImg"
                                    :zoom-speed="7"
                                    :height="150"
                                    class="imgupload"
                                ></croppa>
                            </v-card>
                            <div class="ContinueCancel">
                                <v-btn text>Cancel</v-btn>
                                <v-btn color="primary" @click="nextStep(2)">
                                    Continue
                                </v-btn>
                            </div>
                        </v-stepper-content>

                        <!-- 登録ページ 3 -->

                        <v-stepper-content :key="`3-content`" :step="3">
                            <!-- <v-btn color="primary" @click="nextStep(3)">
                                Continue
                            </v-btn>

                            <v-btn text>Cancel</v-btn> -->
                            <v-card class="mb-12" flat>
                                <!-- 位置情報の取得 -->
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="nowPlace"
                                            clearable
                                            label="Tap Right Circle & Get Location"
                                            type="text"
                                        >
                                            <template v-slot:prepend>
                                                <v-tooltip bottom>
                                                    <template
                                                        v-slot:activator="{
                                                            on
                                                        }"
                                                    >
                                                        <v-icon v-on="on"
                                                            >mdi-help-circle-outline</v-icon
                                                        >
                                                    </template>
                                                    <v-icon>
                                                        mdi-crosshairs-gps
                                                    </v-icon>
                                                    で現在地を取得
                                                </v-tooltip>
                                            </template>
                                            <template v-slot:append>
                                                <v-fade-transition
                                                    leave-absolute
                                                >
                                                    <v-progress-circular
                                                        v-if="geoLoading"
                                                        size="24"
                                                        color="info"
                                                        indeterminate
                                                    ></v-progress-circular>
                                                    <v-icon
                                                        v-else
                                                        @click="getLocation"
                                                        >mdi-crosshairs-gps</v-icon
                                                    >
                                                </v-fade-transition>
                                            </template>
                                        </v-text-field>
                                        <!-- 出身国の追加 -->
                                        <v-select
                                            v-model="country"
                                            label="Where are you from?"
                                            :items="countries"
                                            width="50px"
                                            item-value="iso2"
                                            item-text="name"
                                            class="caption"
                                            prepend-icon="mdi-flag-outline"
                                            return-object
                                            @input="updateValue"
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
                                        <!-- 職業選択 -->
                                        <v-menu
                                            ref="menu"
                                            v-model="menu"
                                            :close-on-content-click="false"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    v-model="date"
                                                    label="Birthday date"
                                                    prepend-icon="mdi-calendar-today"
                                                    readonly
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                ref="picker"
                                                v-model="date"
                                                :max="
                                                    new Date()
                                                        .toISOString()
                                                        .substr(0, 10)
                                                "
                                                min="1950-01-01"
                                                @change="saveBirth"
                                            ></v-date-picker>
                                        </v-menu>
                                        <!-- 言語選択 -->
                                        <v-select
                                            v-model="language"
                                            :hint="languages.description"
                                            :items="languages"
                                            item-text="name"
                                            item-value="value"
                                            label="First Language"
                                            persistent-hint
                                            return-object
                                            single-line
                                            prepend-icon="mdi-flag-outline"
                                        ></v-select>
                                        <!-- 性別の選択 -->
                                        <v-select
                                            v-model="gender"
                                            :items="genders"
                                            item-text="name"
                                            item-value="val"
                                            label="Your gender"
                                            return-object
                                            single-line
                                        ></v-select>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <div class="ContinueCancel">
                                <v-btn text>Cancel</v-btn>
                                <v-btn color="primary" @click="nextStep(3)">
                                    Continue
                                </v-btn>
                            </div>
                        </v-stepper-content>

                        <!-- 登録画面 4-->
                        <v-stepper-content :key="`4-content`" :step="4">
                            <v-textarea
                                v-model="greetingContent"
                                class="card-text__font pa-2"
                                auto-grow
                                color="accent"
                                autofocus
                                clearable
                                placeholder="'What do you want to do?'"
                                label="Edit Greeting"
                                :counter="counter"
                                :rules="greetingRules"
                                rows="1"
                            >
                            </v-textarea>
                            <v-checkbox
                                v-model="agreementPolicy"
                                :rules="[rules.required]"
                            >
                                <template v-slot:label>
                                    <a
                                        href="#"
                                        @click.stop.prevent="
                                            dialogBox = dialogContent.Policy
                                            dialog = true
                                        "
                                    >
                                        Privacy Policy / Terms of Service </a
                                    >*
                                </template>
                            </v-checkbox>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn text>
                                    Clear
                                </v-btn>
                                <div class="flex-grow-1"></div>
                                <v-btn
                                    :disabled="!form"
                                    :loading="isLoading"
                                    class="white--text"
                                    color="deep-purple accent-4"
                                    depressed
                                    @click="register"
                                    >Submit</v-btn
                                >
                            </v-card-actions>
                            <v-alert
                                v-model="errorAlert"
                                dismissible
                                :color="alertColor"
                                border="left"
                                elevation="2"
                                colored-border
                                :icon="alertIcon"
                                style="word-break: break-all;"
                            >
                                <div
                                    v-for="text in Msg.split('\n')"
                                    :key="text"
                                >
                                    {{ text }}
                                </div>
                            </v-alert>
                            <v-dialog v-model="greetingExample" width="400">
                                <v-card absolute max-width="400" persistent>
                                    <v-img
                                        :src="
                                            require('~/assets/images/greetingExample.png')
                                        "
                                    />
                                    <v-card-actions class="text-center pb-4">
                                        <v-spacer />
                                        <v-btn
                                            color="accent"
                                            text
                                            outlined
                                            @click="
                                                greetingExample = !greetingExample
                                            "
                                            >OK !</v-btn
                                        >
                                        <v-spacer />
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog
                                v-model="dialog"
                                absolute
                                max-width="400"
                                persistent
                            >
                                <v-card>
                                    <v-card-title
                                        class="headline grey lighten-3"
                                    >
                                        <!-- ここにラベル -->
                                        {{ dialogBox.label }}
                                    </v-card-title>
                                    <v-card-text>
                                        <!-- ここにテキスト -->
                                        {{ dialogBox.text }}
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-btn
                                            text
                                            @click="
                                                ;(agreementPolicy = false),
                                                    (dialog = false)
                                            "
                                        >
                                            No
                                        </v-btn>
                                        <div class="flex-grow-1"></div>
                                        <v-btn
                                            class="white--text"
                                            color="deep-purple accent-4"
                                            @click="
                                                ;(agreementPolicy = true),
                                                    (dialog = false)
                                            "
                                        >
                                            Yes
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-form>
        </v-content>
    </v-app>
</template>

<script>
import { AsYouType } from 'libphonenumber-js'
import { countries } from '~/plugins/phoneCodeCountries'
import '~/plugins/croppa'

export default {
    layout: 'empty',
    auth: false,
    data() {
        return {
            form: false,
            /**
             * Facebook認証関連
             */
            initUserImg: '',
            strategies: [
                {
                    key: 'facebook',
                    name: 'Facebook',
                    color: '#3c65c4',
                    icon: 'facebook-box'
                }
            ],
            facebookData: {},
            agreementService: false,
            agreementPolicy: false,
            dialogContent: {
                Service: {
                    label: 'Terms of Service',
                    text: `
                            Terms of Service Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor
                            in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.`
                },
                Policy: {
                    label: 'Privacy Policy',
                    text: `
                            Privacy Policy Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor
                            in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.`
                }
            },
            dialogBox: '',
            dialog: '',
            isLoading: false,
            INPUT_FORM_DATA: {
                name: '',
                email: '',
                password: '',
                birthday: '',
                sex: 2,
                geolocation: '',
                job_type: '',
                oauth_id: 0,
                face_image: '',
                fst_lang: ''
            },

            e1: 1,
            steps: 4,
            /**
             * name validation
             */
            name: '',
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) =>
                    v === null ||
                    v.length <= 20 ||
                    'Name must be less than 20 characters'
            ],
            /**
             * email validation
             */
            email: '',
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'E-mail must be valid'
            ],
            /**
             * password validation
             */
            showPassword: false,
            password: '',
            rules: {
                required: (value) => !!value || 'Required.',
                min: (v) => v.length >= 8 || 'Min 8 characters',
                emailMatch: () =>
                    "The email and password you entered don't match"
            },
            /**
             * phone validation
             */
            country: '',
            countries,
            phone: '',
            currPhoneInp: new AsYouType('JP'),
            phoneRules: [
                (v) => !!v || 'Phone number required',
                (v) => {
                    try {
                        return this.currPhoneInp.getNumber().isPossible() &&
                            this.currPhoneInp.getNumber().isValid()
                            ? true
                            : 'false'
                    } catch (error) {
                        return 'error'
                    }
                }
            ],
            /**
             * gender
             */
            gender: '',
            genders: [
                { name: 'Female', val: 0 },
                { name: 'Male', val: 1 },
                { name: 'Others', val: 2 }
            ],

            /**
             * 誕生日の選択
             */
            date: '',
            menu: false,
            // phoneNumber: parsePhoneNumberFromString('Phone: 08031947940', 'JP')
            /**
             * 現在地情報
             */
            geoLoading: false,
            latitude: '',
            longitude: '',
            place: '',
            nowPlace: '',
            /**
             * 職種の設定
             */
            job: { name: '職種の選択', value: 0, description: '' },
            jobs: [
                { name: '事務・オフィス系', value: 1, description: '' },
                { name: '販売・飲食・サービス系', value: 2, description: '' },
                { name: 'IT・エンジニア系', value: 3, description: '' },
                { name: 'Web・クリエーター系', value: 4, description: '' },
                { name: '医療・介護・福祉系', value: 5, description: '' },
                { name: '研究機関・教育系', value: 6, description: '' },
                { name: '商社・金融・経営', value: 7, description: '' },
                { name: '学生', value: 8, description: '' }
            ],
            /**
             * 言語選択
             */
            language: '',
            languages: [
                { name: '英語', langCode: 'en', description: '' },
                { name: '中国語', langCode: 'zh', description: '' },
                { name: '日本語', langCode: 'ja', description: '' },
                { name: '韓国語', langCode: 'ko', description: '' },
                { name: 'ロシア語', langCode: 'be', description: '' },
                { name: 'ポルトガル語', langCode: 'pt', description: '' },
                { name: 'スペイン語', langCode: 'es', description: '' },
                { name: 'フランス語', langCode: 'fr', description: '' },
                { name: 'ドイツ語', langCode: 'de', description: '' },
                { name: 'イタリア語', langCode: 'it', description: '' },
                { name: 'マレー語', langCode: 'ms', description: '' },
                { name: 'フィリピン語', langCode: 'tl', description: '' },
                { name: 'ベトナム語', langCode: 'vi', description: '' },
                { name: 'タイ語', langCode: 'th', description: '' },
                { name: '台湾語', langCode: 'tw', description: '' },
                { name: 'その他', langCode: 'other', description: '' }
            ],

            /**
             * 画像のアップロード
             */

            image: '',
            croppaImg: null,
            imgUrl: '',
            formData: new FormData(),
            /**
             * 挨拶文の追加
             */
            greeting: {},
            greetingContent: '',
            counter: 200,
            greetingRules: [
                (v) => v === null || v.length <= 200 || 'Max 200 characters'
            ],
            greetingExample: false,
            /**
             * 通信エラー
             */
            errorAlert: false,
            Msg: '',
            alertColor: 'cyan',
            alertIcon: 'mdi-hail',
            int_counter: 0
        }
    },
    computed: {
        // nowPlace() {
        //     return this.place.prefecture === undefined
        //         ? ''
        //         : ``
        // }
    },

    watch: {
        initUserImg() {
            this.croppaImg.refresh()
        },
        steps(val) {
            if (this.e1 > val) {
                this.e1 = val
            }
        },
        menu(val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
        greetingContent() {
            this.greeting.content = this.greetingContent
        },
        e1() {
            if (this.e1 === 4) {
                self = this
                setTimeout(function() {
                    self.greetingExample = true
                }, 500)
            }
        },
        facebookData() {
            this.int_counter += 1
            if (this.int_counter > 1) return 0
            this.name = this.facebookData.name
            // this.email = this.facebookData.email
            // const birthday = new Date(this.facebookData.birthday)
            // this.date = `${birthday.getFullYear()}-${birthday.getMonth() +
            //     1}-${birthday.getDate()}`
            this.initUserImg = `https://graph.facebook.com/${this.facebookData.id}/picture?width=1000&height=1000`
            // this.getUserPhoto()
        }
    },

    methods: {
        nextStep(n) {
            this.currentValue()
            if (n === this.steps) {
                this.e1 = 1
            } else {
                this.e1 = n + 1
            }
        },
        test() {
            const a = new AsYouType('JP')
            a.input('08031947940')
            const b = new AsYouType('JP').input('0223751514')
        },
        updateValue() {
            this.currPhoneInp = new AsYouType(this.country.iso2.toUpperCase())
            this.phone = this.currPhoneInp.input(this.phone)
            //
            //
            try {
            } catch (error) {}
        },
        saveBirth(date) {
            this.$refs.menu.save(date)
        },

        timeout(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms))
        },
        /**
         * get GeoLocation and location name
         *
         */
        async getLocation() {
            this.geoLoading = true
            // ここから
            await this.timeout(2000)

            this.longitude = 139.7113362
            this.latitude = 35.673192
            const self = this
            this.$axios
                .$get(`${process.env.apiBaseUrl}locationplace`, {
                    params: {
                        x: this.longitude,
                        y: this.latitude
                    }
                })
                .then(function(response) {
                    self.geoLoading = false
                    if (response.response.location.length > 0) {
                        self.place = response.response.location[0]
                        self.nowPlace = `${self.place.prefecture}, ${self.place.city}`
                    }
                })

            // ここまで

            // await navigator.geolocation.getCurrentPosition(
            //     function(position) {
            //         self.latitude = position.coords.latitude
            //         self.longitude = position.coords.longitude

            //         self.$axios
            //             .$get(`${process.env.apiBaseUrl}locationplace`, {
            //                 params: {
            //                     x: position.coords.longitude,
            //                     y: position.coords.latitude
            //                 }
            //             })
            //             .then(function(response) {
            //                 self.geoLoading = false
            //                 if (response.response.location.length > 0) {
            //                     self.place = response.response.location[0]
            //                     self.nowPlace = `${self.place.prefecture}, ${self.place.city}`
            //                 }
            //             })
            //     },
            //     function(error) {
            //         switch (error.code) {
            //             case 1: // PERMISSION_DENIED
            //                 alert('位置情報の利用が許可されていません')
            //                 break
            //             case 2: // POSITION_UNAVAILABLE
            //                 alert('現在位置が取得できませんでした')
            //                 break
            //             case 3: // TIMEOUT
            //                 alert('タイムアウトになりました')
            //                 break
            //             default:
            //                 alert('Error (エラーコード:' + error.code + ') ')
            //                 break
            //         }
            //     }
            // )
        },

        imageUploader() {
            this.croppaImg.generateBlob((blob) => {
                this.formData.append('face_image', blob)

                this.$axios.$post(
                    `${process.env.apiBaseUrl}imageupload`,
                    this.formData
                )
            })
        },
        currentValue() {
            this.INPUT_FORM_DATA = {
                name: this.name,
                email: this.email,
                password: this.password,
                birthday: this.date,
                sex: this.gender.val,
                geolocation: [this.longitude, this.latitude],
                job_type: this.job.value,
                oauth_id: 0,
                face_image: '',
                country: this.country.iso2,
                fst_lang: this.language.langCode,
                ...this.greeting
            }
        },
        register() {
            this.isLoading = true
            this.currentValue()
            Object.keys(this.INPUT_FORM_DATA).forEach((i) =>
                this.formData.append(i, this.INPUT_FORM_DATA[i])
            )
            this.croppaImg.generateBlob((blob) => {
                this.formData.append('face_image', blob)

                this.$axios
                    .$post(
                        `${process.env.apiBaseUrl}auth/register`,
                        this.formData
                    )
                    .then((res) => {
                        this.Msg = `Register Successful
                        Now loading... Please wait`
                        this.errorAlert = true
                        this.isLoading = false
                        if (res.access_token) {
                            this.$auth.loginWith('local', {
                                data: {
                                    email: this.email,
                                    password: this.password
                                }
                            })
                        }
                    })
                    .then((res) => {
                        this.$router.push('/app/select')
                    })
                    .catch((i) => {
                        // console.log(i.response.data)
                        // console.log(i.response.status) // 例：400
                        // console.log(i.response.statusText) // Bad Request
                        // console.log(i.response.headers)
                        this.alertColor = 'error'
                        this.alertIcon = 'mdi-alert-circle-outline'
                        this.errorAlert = true
                        this.isLoading = false
                        this.Msg = `${i}\n${i.response.statusText}\n${i.response.data.message}
                        `
                        this.formData = new FormData()
                    })
            })
        },

        /**
         * Facebook 連携用
         */
        async getFacebookMe() {
            const self = this
            await window.FB.api(
                '/me',
                {
                    fields: 'id,about,birthday,email,gender,location,name'
                },
                function(response) {
                    self.facebookData = response
                    self.nextStep(1)
                }
            )
        },
        facebookLogin() {
            const self = this
            window.FB.login(
                function(response) {
                    const { accessToken, userID } = response.authResponse
                    self.$axios
                        .$get(
                            `https://graph.facebook.com/${userID}?fields=birthday,email&access_token=${accessToken}`
                        )
                        .then((i) => {
                            self.email = i.email
                            const birthday = new Date(i.birthday)
                            self.date = `${birthday.getFullYear()}-${birthday.getMonth() +
                                1}-${birthday.getDate()}`
                        })
                },
                { scope: 'email' }
            )
        },
        async getFacebookLoginStatus() {
            const self = this
            await window.FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    self.getFacebookMe()
                } else {
                    self.facebookLogin()
                }
            })
        },
        getUserPhoto() {
            const self = this
            this.$axios
                .$get(
                    `https://graph.facebook.com/${this.facebookData.id}/picture?width=1000&height=1000`
                )
                .then(
                    (i) =>
                        (self.initUserImg = `https://graph.facebook.com/${this.facebookData.id}/picture?width=1000&height=1000`)
                )
        },
        signupWithFacebook() {
            window.FB.init({
                appId: 2492514334313989,
                xfbml: true,
                version: 'v4.0'
            })
            this.getFacebookLoginStatus()

            const self = this
            /**
             * 以下を参考にした
             * https://stackoverflow.com/questions/24031418/get-facebook-user-data-javascript-api
             * https://stackoverflow.com/questions/43382485/how-to-await-fb-login-callback-on-reactjs
             */
            window.FB.Event.subscribe('auth.statusChange', function() {
                self.getFacebookMe()
            })
        }
    }
}
</script>

<style scoped>
.inline {
    display: inline-block;
    margin-bottom: 0 !important;
}
.ContinueCancel {
    text-align: center;
}
.container {
    width: 100%;
    text-align: center;
}
.v-stepper {
    box-shadow: none;
}
</style>
