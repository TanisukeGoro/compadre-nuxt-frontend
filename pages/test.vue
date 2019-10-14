<template>
    <v-app>
        <v-content>
            <v-container grid-list-xs>
                <v-btn color="success" @click="onClick">取得</v-btn>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    auth: false,
    layout: 'empty',
    methods: {
        onClick() {
            this.$auth.setToken(
                'local',
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2FwaVwvdjFcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNTcxMDQxNTA1LCJleHAiOjE1NzEwNDE2MjUsIm5iZiI6MTU3MTA0MTUwNSwianRpIjoiaW95QWVqQVZpS3o2S2ZoQSIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.ys14tz0kkRcRhRFY9Deoz-sI8224AloBmbM_F2_6oss'
            )
            // const a = this.$auth.$storage.getLocalStorage('_token.local')
            // this.$auth.$storage.setLocalStorage('key', 'val', false)
            // console.log(a)
        }
    }
}
</script>
