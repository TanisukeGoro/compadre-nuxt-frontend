<template>
    <v-app>
        <v-content>
            <v-container grid-list-xl style="max-width: 600px;">
                <div v-for="(msg, index) in posts" :key="index">
                    <v-message-date
                        v-show="changeMessageNo.includes(index)"
                        :key="index + 'date'"
                        :message="msg"
                    ></v-message-date>
                    <v-layout
                        column
                        :align-end="msg.send_uid === $auth.state.user.id"
                    >
                        <v-flex>
                            <v-messageTimestamp
                                :is-own="msg.send_uid === $auth.state.user.id"
                                :message="msg"
                                :to-talk-user="toTalk_user"
                            >
                            </v-messageTimestamp>
                        </v-flex>
                    </v-layout>
                </div>
            </v-container>
            <v-send-footer />
        </v-content>
    </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { db } from '~/plugins/firebase.js'

import VMessageTimestamp from '~/components/chat/VMessageTimestamp'
import VMessageDate from '~/components/chat/VMessageDate'
import VSendFooter from '~/components/chat/VSendFooter'
export default {
    layout: 'chat',
    components: {
        VMessageTimestamp,
        VMessageDate,
        VSendFooter
    },
    data() {
        return {
            message: '',
            changeMessageNo: [],
            timestamps: [],
            toTalk_user: '',
            directMessages: this.$store.state.directMessages,
            sendText: ''
        }
    },
    computed: {
        // VuexからPostsデータを取得
        ...mapGetters('app/chat/firebase', ['posts'])
    },
    mounted() {},
    created() {
        // console.log(this.chatlists())
        this.toTalk_user = this.chatlists().find(
            (i) => i.hashed_room_id === this.$route.params.room_id
        )
        if (!this.toTalk_user) this.$router.push('/app/chat')

        // console.log(this.toTalk_user)
        // console.log(this.toTalk_user.toTole_uinfo)
        /**
         * setPostRefでfirestoreからの情報を取ってくるまで待機
         * 受信してから refresh renderを実行
         */
        this.setPostsRef(
            db
                .collection(
                    `/chat_rooms/${this.$route.params.room_id}/messages`
                )
                .orderBy('created')
        ).then(() => {
            this.refreshRender()
            console.log('処理終わり？')
        })
    },
    methods: {
        ...mapActions('app/chat/firebase', ['setPostsRef']),
        ...mapState('app/chat/chatList', ['chatlists']),
        // ...mapState('app/chat/firebase', ['posts']),
        refreshRender() {
            console.log(this.posts)
            this.timestamps = []
            this.changeMessageNo = []
            this.posts.forEach((res, index) => {
                // console.log(res.created.toDate().getDate())
                if (
                    res.created &&
                    !this.timestamps.includes(res.created.toDate().getDate())
                ) {
                    this.timestamps.push(res.created.toDate().getDate())
                    this.changeMessageNo.push(index)
                }
            })
            window.scrollTo(0, document.body.clientHeight)
        },
        sendMessage() {},
        getMessages() {}
    }
}
</script>
