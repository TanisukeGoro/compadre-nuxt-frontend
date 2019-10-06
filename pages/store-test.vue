<template>
    <v-app>
        <v-btn @click="depatch">普通のdepatch</v-btn>
        <v-btn @click="getState">普通のgetState</v-btn>
        <v-btn @click="depatch_withNameSpace">名前空間を使ったdepatch</v-btn>
        <v-btn @click="getState_withNameSpace">名前空間を使ったgetState</v-btn>
    </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    auth: false,
    data() {
        return {
            obj: ''
        }
    },
    mounted() {},
    methods: {
        ...mapActions('comman/auth', ['jwt_auth', 'candidate']),
        ...mapState('comman/auth', ['data']),

        depatch() {
            this.$store.dispatch(
                'comman/auth/jwt_auth',
                { user: 'depatchくん', age: '永遠の53歳' },
                { root: true }
            )
        },
        getState() {},
        depatch_withNameSpace() {
            this.obj = { user: 'depatchくん', age: '永遠の53歳' }
            this.jwt_auth(this.obj)
        },

        getState_withNameSpace() {}
    }
}
</script>
