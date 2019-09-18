<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
            <div class="text-center">
                <logo />
                <vuetify-logo />
            </div>
            <v-card>
                <v-card-title class="headline">
                    Welcome to the Vuetify + Nuxt.js template
                </v-card-title>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="Axios_get">
                        Axios GET Async / Await テスト
                    </v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-btn color="primary" @click="post_login">
                        Axios Login テスト
                    </v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="Axios_get">
                        Axios Logout テスト
                    </v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-btn color="primary" @click="Axios_get">
                        Axios Refresh テスト
                    </v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="Axios_get">
                        Axios get User テスト
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
    components: {
        Logo,
        VuetifyLogo
    },
    data() {
        return {
            host: '',
            baseURL: process.env.apiBaseUrl,
            response_jwt: ''
        }
    },
    methods: {
        Axios_get() {
            this.$axios
                .$get(`${this.baseURL}test`)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        },

        async getUser() {
            try {
                const response = await this.$axios.post(`${this.baseURL}test`)
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        },
        async post_login() {
            console.log(this.response_jwt)
            try {
                const response = await this.$axios.post(
                    `http://localhost/api/v1/auth/login`,
                    {
                        email: 'tomoya.nishinosono@example.com',
                        password: 'secret'
                    }
                )
                console.log(response)
                this.response_jwt = response.data
            } catch (error) {
                console.log(error)
            }
            console.log(this.response_jwt)
            this.$store.dispatch('jwt_auth', this.response_jwt)
            this.$router.push('/inspire')
        }
        // async asyncData({ app }) {
        //     // const response = await app.$axios.$get(`https://httpbin.org/get`)
        //     const response = await app.$axios.$get(
        //         `${process.env.apiBaseUrl}test`
        //     )
        //     console.log(response)
        //     // return { host: response.headers.Host }
        // }
    }
}
// export default {

//     data() {
//         return {
//             url: process.env.apiBaseUrl
//         }
//     },
//     mounted() {
//         this.login()
//     },
//     methods: {
//         login() {
//             console.log(this.url)
//         }
//     }
// }
</script>
