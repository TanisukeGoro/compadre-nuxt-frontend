<template>
    <v-layout column justify-center align-center>
        <v-btn color="success" to="/login" nuxt>LOGIN</v-btn>
        <v-flex xs12 sm8 md6>
            <v-btn color="primary" @click="auth_login">primary</v-btn>
            <v-btn color="secondary" @click="Axios_get">Axios_get</v-btn>
            <v-btn color="accent">accent</v-btn>
            <v-btn color="error">error</v-btn>
            <v-btn color="warning">warning</v-btn>
            <v-btn color="success">success</v-btn>
            <v-btn color="info">info</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    layout: 'empty',
    auth: false,
    components: {},
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
                const response = await this.$axios.$post(`${this.baseURL}test`)
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        },
        async auth_login() {
            try {
                const response = await this.$axios.$post(
                    `${this.baseURL}auth/login`,
                    {
                        email: 'youichi.kudo@example.net',
                        password: 'secret'
                    }
                )
                // console.log(response)
                this.response_jwt = response
            } catch (error) {
                console.log(error)
            }
            this.$store.dispatch('comman/auth/jwt_auth', this.response_jwt, {
                root: true
            })
            this.$router.push('/inspire')
        },
        authenticate() {
            this.$auth.loginWith('local', {
                data: {
                    email: 'youichi.kudo@example.net',
                    password: 'secret'
                }
            })
        },
        async get_user() {
            console.log(this.$store.getters.data)
            try {
                const response = await this.$axios.$get(`${this.baseURL}user`)
                console.log(response)
            } catch (error) {}
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
