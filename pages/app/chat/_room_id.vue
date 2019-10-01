<template>
    <v-app>
        <v-content>
            <!-- <v-btn color="success" @click="debug">ゲット</v-btn> -->
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
                <transition name="fade">
                    <chat-card
                        v-if="showBotCard"
                        :to-talk-user="toTalk_user"
                        :answer-status="answer"
                    />
                </transition>
                <transition name="fade">
                    <chat-card-select
                        v-if="showBotCard"
                        @selectCardFromChild="selectCard($event)"
                    />
                </transition>
            </v-container>
            <v-send-footer @sendDataFromChild="sendMessage($event)" />
        </v-content>
    </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { db, firebase } from '~/plugins/firebase.js'

import VMessageTimestamp from '~/components/chat/VMessageTimestamp'
import VMessageDate from '~/components/chat/VMessageDate'
import VSendFooter from '~/components/chat/VSendFooter'

import ChatCard from '@/components/chat/ChatCard'
import ChatCardSelect from '@/components/chat/ChatCardSelect'
export default {
    layout: 'chat',
    components: {
        VMessageTimestamp,
        VMessageDate,
        VSendFooter,
        ChatCardSelect,
        ChatCard
    },
    data() {
        return {
            message: '',
            changeMessageNo: [],
            timestamps: [],
            toTalk_user: '',
            directMessages: this.$store.state.directMessages,
            userId: this.$auth.state.user.id,
            showBotCard: false,
            answer: false
        }
    },
    computed: {
        // VuexからPostsデータを取得
        ...mapGetters('app/chat/firebase', ['posts'])
    },
    async mounted() {
        const chatInfoData = await this.getChatInfo()
        if (chatInfoData) {
            chatInfoData.rallyCount > 5 && !chatInfoData.botEvent
                ? (this.showBotCard = true)
                : console.log('イベント発火なし！')
        }
    },
    updated() {
        window.scrollTo(0, document.body.clientHeight)
    },
    created() {
        // console.log(this.chatlists())
        this.toTalk_user = this.chatlists().find(
            (i) => i.hashed_room_id === this.$route.params.room_id
        )
        if (!this.toTalk_user) this.$router.push('/app/chat')

        // console.log(this.toTalk_user)
        // console.log(this.toTalk_user.toTolk_uinfo)
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
        async debug() {
            console.log(this.posts[this.posts.length - 2].send_uid)
            const chatInfoData = await this.getChatInfo()
            console.log(chatInfoData)
            // this.updateChatInfo(chatInfoData)
            // console.log()
        },
        refreshRender() {
            // console.log(this.posts)
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

        async setChatInfo(recentPost, recentUser, rallyCount, botEvent) {
            console.log(recentPost, recentUser, rallyCount, botEvent)
            console.log('setChatInfo')
            await db
                .collection('chat_rooms')
                .doc(this.$route.params.room_id)
                .set({
                    recentPost,
                    recentUser,
                    rallyCount,
                    botEvent
                })
        },

        // this.posts[this.posts.length - 2].send_uid ===
        // this.$auth.state.user.id
        //     ? rallyCount
        //     : rallyCount++
        async getChatInfo() {
            // const chatInfo = ''
            const chatInfo = await db
                .collection('chat_rooms')
                .doc(this.$route.params.room_id)
                .get()
            const data = chatInfo.data()
            return data
        },

        initChatInfo(postedText) {
            console.log('object :', 'chat init')
            this.setChatInfo(postedText, this.$auth.state.user.id, 1, false)
        },
        updateChatInfo(chatInfoData, postedText, setEventState) {
            console.log(chatInfoData, postedText, setEventState)
            const { recentPost, recentUser, rallyCount } = chatInfoData
            if (recentPost && recentUser && rallyCount) {
                // 更新処理
                console.log(
                    'recentPost, recentUser, rallyCount  :',
                    recentPost,
                    recentUser,
                    rallyCount
                )
                return this.setChatInfo(
                    postedText,
                    this.userId,
                    recentUser === this.userId ? rallyCount : rallyCount + 1,
                    setEventState
                )
            } else {
                // データがないってことはどういう状況なの？
                // initするべきか。
                return this.setChatInfo(postedText, this.userId, 1)
            }
        },
        async sendMessage(dbdata) {
            if (!dbdata) return 0

            const self = this
            // データの登録
            await db
                .collection(
                    `/chat_rooms/${this.$route.params.room_id}/messages`
                )
                .add({
                    text: dbdata.text,
                    send_uid: dbdata.send_uid,
                    receive_uid: this.toTalk_user.toTolk_uid,
                    idRead: dbdata.idRead,
                    created: dbdata.created
                })
                .then(() => {
                    'Status OK'
                })
                .catch(function(error) {
                    console.error('Error writing document: ', error)
                })

            const chatInfoData = await this.getChatInfo()
            !chatInfoData
                ? this.initChatInfo(dbdata.text)
                : self.updateChatInfo(chatInfoData, dbdata.text, false)
        },
        getMessages() {},
        async selectCard(card) {
            console.log('card :', card)
            const sendData = {
                text: `:proposeActivity(${card.select}):`,
                send_uid: this.$auth.state.user.id,
                receive_uid: this.toTalk_user.toTolk_uid,
                idRead: false,
                created: firebase.firestore.FieldValue.serverTimestamp()
            }
            await this.sendMessage(sendData)
            const chatInfoData = await this.getChatInfo()
            console.log(chatInfoData)
            !chatInfoData
                ? this.initChatInfo(sendData.text)
                : this.updateChatInfo(chatInfoData, sendData.text, true)

            this.answer = true
            this.showBotCard = false
        }
    }
}
</script>

<style ß>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
