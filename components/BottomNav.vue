<template>
    <v-bottom-navigation app fixed grow shift>
        <v-btn to="/app/select" nuxt>
            <span>Home</span>
            <v-icon>mdi-home-outline</v-icon>
        </v-btn>

        <v-btn to="/app/chat" nuxt>
            <span>Chat</span>
            <v-icon>mdi-chat-outline</v-icon>
        </v-btn>

        <v-btn to="/app/attention-me" nuxt>
            <span>Like</span>
            <v-icon>mdi-heart-multiple-outline</v-icon>
        </v-btn>

        <v-btn to="/app/user" nuxt>
            <span>User</span>
            <v-icon>mdi-account-outline</v-icon>
            <!-- ユーザーの画像を入れたいけど難しいので飛ばし中 -->
            <!-- <v-avatar :size="24">
                <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" />
            </v-avatar> -->
        </v-btn>
    </v-bottom-navigation>
</template>
<script>
export default {
    data() {
        return {}
    },
    computed: {}
}
</script>
