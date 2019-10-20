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
                                <component
                                    :is="msg.text.match(regexp)[1]"
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
                                <!-- <spot-card
                                    class="callout right"
                                    :class="
                                        msg.send_uid === $auth.state.user.id
                                            ? 'left'
                                            : 'right'
                                    "
                                    :card-type="msg.text.match(regexp)"
                                    :post-id="msg.id"
                                    :to-tolk-user="toTalk_user"
                                /> -->
                            </v-flex>
                        </v-layout>
                    </div>
                </div>
                <!-- <transition name="fade">
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
                </transition> -->
            </v-container>
            <v-send-footer
                @sendDataFromChild="sendMessage($event)"
                @openCarender="openCarender"
            />
            <v-dialog
                v-model="recommendationDialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
            >
                <v-card flat>
                    <v-toolbar flat color="primary">
                        <v-btn icon dark @click="recommendationDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text
                        class="pa-0 text-center"
                        :style="{
                            background: $vuetify.theme.themes['light'].primary
                        }"
                        >{{ dialogMsg }}</v-card-text
                    >
                    <component
                        :is="componentId"
                        ref="recommendDates"
                        :to-talk-user="toTalk_user"
                        :card-type="cardType"
                        @sendRecommendationDate="sendRecommend($event)"
                        @closeSelectSpot="closeSelectSpot($event)"
                    />
                </v-card>
            </v-dialog>
            <hook-recommend-event
                :recommend-event="showBotCard"
                :to-talk-user="toTalk_user"
                @closeEvent="showBotCard = !showBotCard"
                @selectEventFromChild="selectEventType($event)"
            />
        </v-content>
    </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { db, firebase } from '~/plugins/firebase'

import VMessageTimestamp from '~/components/chat/VMessageTimestamp'
import VMessageDate from '~/components/chat/VMessageDate'
import VSendFooter from '~/components/chat/VSendFooter'
import RecommendDate from '~/components/chat/RecommendDate'

import ChatCard from '@/components/chat/ChatCard'
import ChatCardSelect from '@/components/chat/ChatCardSelect'
import SpotCard from '@/components/chat/SpotCard'
import ProposalMeetingDates from '@/components/chat/ProposalMeetingDates'
import ProposalMeetingSpot from '@/components/chat/ProposalMeetingSpot'
import HookRecommendEvent from '@/components/chat/HookRecommendEvent'
export default {
    layout: 'chat',
    components: {
        VMessageTimestamp,
        VMessageDate,
        VSendFooter,
        ChatCardSelect,
        ChatCard,
        sendActivityCard: SpotCard,
        selectActivitySpot: SpotCard,
        proposeActivity: SpotCard,
        proposalMeetingDates: ProposalMeetingDates,
        RecommendDate,
        ProposalMeetingSpot,
        HookRecommendEvent
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
            regexp: /^:(.*)\((.*)\):$/,
            // ダイアログ
            recommendationDialog: false,
            recommendEvent: false,
            dialogTitle: '',
            dialogMsg: '',
            cardType: '',
            componentId: ''
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
        console.log(this.toTalk_user)

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

        async getChatInfo() {
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
                console.log('更新処理')
                return this.setChatInfo(
                    postedText,
                    this.userId,
                    recentUser === this.userId ? rallyCount : rallyCount + 1,
                    setEventState
                )
            } else {
                // データがないってことはどういう状況なの？
                // initするべきか。
                console.log('そうじゃない')
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
                    send_uid: this.$auth.state.user.id,
                    receive_uid: this.toTalk_user.toTolk_uid,
                    idRead: false,
                    created: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    'Status OK'
                })

            const chatInfoData = await this.getChatInfo()
            !chatInfoData
                ? this.initChatInfo(dbdata.text)
                : self.updateChatInfo(chatInfoData, dbdata.text, false)
        },
        selectEventType(card) {
            this.cardType = card.recommendType
            this.dialogTitle = 'お店の予約提案'
            this.dialogMsg = '提案したいお店を選択して下さい！'
            this.showBotCard = false
            this.componentId = 'proposal-meeting-spot'
            this.recommendationDialog = true
        },
        async closeSelectSpot(postedText) {
            const chatInfoData = await this.getChatInfo()
            this.updateChatInfo(chatInfoData, postedText.postText, true)
            this.showBotCard = false
            this.closeDialog()
        },
        openCarender() {
            this.dialogTitle = '日程調整'
            this.dialogMsg = '提案したい日程を2~5個選択して下さい!'
            this.componentId = 'recommend-date'
            this.recommendationDialog = true
        },
        async sendRecommend(data) {
            await this.sendMessage(data)
            this.closeDialog()
            this.$refs.recommendDates.refreshDialog()
        },
        closeDialog() {
            this.recommendationDialog = false
        }
    }
}
</script>

<style scoped>
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
