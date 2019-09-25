<template>
    <v-content>
        <ChatHeader />
        <div></div>
        <v-btn @click="hogehoge">ボタン</v-btn>
        <ChatBottomNav />
    </v-content>
</template>

<script>
import ChatHeader from '~/components/ChatHeader'
import ChatBottomNav from '~/components/ChatBottomNav'
export default {
    layout: 'empty',
    components: {
        ChatHeader,
        ChatBottomNav
    },
    methods: {
        hogehoge(value) {
            console.log(value.b)
            alert('od')
        }
    }
}
</script>

<style></style>
