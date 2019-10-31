<template>
    <v-layout>
        <v-flex class="text-center">
            <img src="/v.png" alt="Vuetify.js" class="mb-5" />
            <blockquote class="blockquote">
                &#8220;First, solve the problem. Then, write the code.&#8221;
                <footer>
                    <small>
                        <em>&mdash;John Johnson</em>
                    </small>
                </footer>
            </blockquote>
            <v-btn color="primary" @click="jwt_getter"
                >Axios Login テスト</v-btn
            >
        </v-flex>
    </v-layout>
</template>

<script>
// import jwtProvider from '~/plugins/virgilJwtProvider'

export default {
    auth: false,
    leyout: 'empty',
    data() {
        return {}
    },
    methods: {
        jwt_getter() {}
    }
}
</script>
