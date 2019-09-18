<template>
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12 mb-3">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title
                                >The Madisonにログイン</v-toolbar-title
                            >
                            <div class="flex-grow-1"></div>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    label="Email"
                                    name="login"
                                    prepend-icon="mdi-account-circle"
                                    type="text"
                                ></v-text-field>

                                <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn color="primary" @click="login">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card title="Social Login" bg-variant="light" class="p-2">
                        <v-list disabled>
                            <v-list-item-group color="primary">
                                <v-list-item
                                    v-for="auth in strategies"
                                    :key="auth.key"
                                >
                                    <v-list-item-icon>
                                        <v-icon>mdi-{{ auth.icon }}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-btn
                                                block
                                                :style="{
                                                    background: auth.color
                                                }"
                                                class="login-button white--text"
                                                @click="
                                                    $auth.loginWith(auth.key)
                                                "
                                            >
                                                Login with
                                                {{ auth.name }}</v-btn
                                            >
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
export default {
    middleware: ['auth'],
    layout: 'empty',
    components: {},
    data() {
        return {
            email: 'tomoya.nishinosono@example.com',
            password: 'secret',
            error: null,
            strategies: [
                {
                    key: 'auth0',
                    name: 'Auth0',
                    color: '#ec5425',
                    icon: 'login-variant'
                },
                {
                    key: 'google',
                    name: 'Google',
                    color: '#4284f4',
                    icon: 'google'
                },
                {
                    key: 'facebook',
                    name: 'Facebook',
                    color: '#3c65c4',
                    icon: 'facebook-box'
                },
                {
                    key: 'github',
                    name: 'GitHub',
                    color: '#202326',
                    icon: 'github-circle'
                }
            ]
        }
    },
    computed: {
        redirect() {
            return (
                this.$route.query.redirect &&
                decodeURIComponent(this.$route.query.redirect)
            )
        },
        isCallback() {
            return Boolean(this.$route.query.callback)
        }
    },
    methods: {
        async login() {
            this.error = null
            const response = await this.$auth
                .loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                .catch((e) => {
                    this.error = e + ''
                })
            return response
        }
    }
}
</script>
