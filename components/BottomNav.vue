<template>
    <v-bottom-navigation app fixed grow shift>
        <v-btn to="/app" nuxt>
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

        <v-btn to="/app/settings" nuxt>
            <span>Settings</span>
            <v-icon>mdi-settings-outline</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>
<script>
export default {
    computed: {}
}
</script>
