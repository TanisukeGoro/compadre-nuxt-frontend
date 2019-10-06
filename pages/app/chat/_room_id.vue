<template>
    <v-app>
        <v-content>
            <!-- <v-btn color="success" @click="debug">ゲット</v-btn> -->
            <v-container grid-list-xl style="max-width: 600px;">
                <div v-for="(msg, index) in posts" :key="index">
                    <div v-if="!msg.text.match(regexp)">
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
                                    :is-own="
                                        msg.send_uid === $auth.state.user.id
                                    "
                                    :message="msg"
                                    :to-talk-user="toTalk_user"
                                >
                                </v-messageTimestamp>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div v-else>
                        <v-layout
                            column
                            :align-end="msg.send_uid === $auth.state.user.id"
                        >
                            <v-flex>
                                <spot-card
                                    class="callout right"
                                    :class="
                                        msg.send_uid === $auth.state.user.id
                                            ? 'left'
                                            : 'right'
                                    "
                                    :card-type="msg.text.match(regexp)"
                                    :post-id="msg.id"
                                    :to-tolk-user="toTalk_user"
                                />
                            </v-flex>
                        </v-layout>
                    </div>
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
import { db, firebase } from '~/plugins/firebase'

import VMessageTimestamp from '~/components/chat/VMessageTimestamp'
import VMessageDate from '~/components/chat/VMessageDate'
import VSendFooter from '~/components/chat/VSendFooter'

import ChatCard from '@/components/chat/ChatCard'
import ChatCardSelect from '@/components/chat/ChatCardSelect'
import SpotCard from '@/components/chat/SpotCard'
export default {
    layout: 'chat',
    components: {
        VMessageTimestamp,
        VMessageDate,
        VSendFooter,
        ChatCardSelect,
        ChatCard,
        SpotCard
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
            answer: false,
            regexp: /^:(.*)\((.*)\):$/
        }
    },
    computed: {
        // VuexからPostsデータを取得
        ...mapGetters('app/chat/firebase', ['posts'])
    },
    async mounted() {
        const chatInfoData = await this.getChatInfo()
        if (chatInfoData) {
            chatInfoData.rallyCount > 5 &&
                !chatInfoData.botEvent &&
                (this.showBotCard = true)
        }
    },
    updated() {
        window.scrollTo(0, document.body.clientHeight)
    },
    created() {
        this.toTalk_user = this.chatlists().find(
            (i) => i.hashed_room_id === this.$route.params.room_id
        )
        if (!this.toTalk_user) this.$router.push('/app/chat')

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
        })
    },
    methods: {
        ...mapActions('app/chat/firebase', ['setPostsRef']),
        ...mapState('app/chat/chatList', ['chatlists']),
        async debug() {
            await this.getChatInfo()
        },
        refreshRender() {
            this.timestamps = []
            this.changeMessageNo = []
            this.posts.forEach((res, index) => {
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
        // this.userId
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
            this.setChatInfo(postedText, this.userId, 1, false)
        },
        updateChatInfo(chatInfoData, postedText, setEventState) {
            const { recentPost, recentUser, rallyCount } = chatInfoData
            if (recentPost && recentUser && rallyCount) {
                // 更新処理
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

            const chatInfoData = await this.getChatInfo()
            !chatInfoData
                ? this.initChatInfo(dbdata.text)
                : self.updateChatInfo(chatInfoData, dbdata.text, false)
        },
        getMessages() {},
        async selectCard(card) {
            const sendData = {
                text: `:proposeActivity(${card.select}):`,
                send_uid: this.userId,
                receive_uid: this.toTalk_user.toTolk_uid,
                idRead: false,
                created: firebase.firestore.FieldValue.serverTimestamp()
            }
            await this.sendMessage(sendData)
            const chatInfoData = await this.getChatInfo()
            !chatInfoData
                ? this.initChatInfo(sendData.text)
                : this.updateChatInfo(chatInfoData, sendData.text, true)

            this.answer = true
            this.showBotCard = false
        }
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.callout {
    position: relative; /* Set to fix triangle position */
    display: inline-block;
    margin-top: 10px;
    max-width: 320px;
    text-align: left;
    word-wrap: break-word;
    white-space: pre-line;
}
.left::after {
    left: -10px;
}
.right::after {
    right: -10px;
}
</style>
