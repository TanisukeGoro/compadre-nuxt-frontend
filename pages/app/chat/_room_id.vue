<template>
    <v-app>
        <v-content>
            <div>
                <button @click="init_fire">接続</button>
                <li id="main">
                    <!-- データの入力 -->
                    <textarea
                        v-model="message"
                        placeholder="Please enter a comment(Within 100 characters)"
                        maxlength="100"
                    ></textarea>
                    <div class="submitBtn" @click="sendData">
                        Submit
                    </div>
                    <ul>
                        <!-- リスト形式データの表示 -->
                        <li v-for="post in posts" :key="post.id">
                            {{ post.text }}
                        </li>
                    </ul>
                </li>
            </div>
        </v-content>
    </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import { firebase, db } from '~/plugins/firebase.js'

export default {
    data() {
        return {
            message: ''
        }
    },
    computed: {
        // VuexからPostsデータを取得
        ...mapGetters('app/chat/firebase', ['posts'])
    },
    created() {
        this.setPostsRef(
            db
                .collection(
                    `/chat_rooms/${this.$route.params.room_id}/messages`
                )
                .orderBy('created')
        )
    },
    methods: {
        ...mapActions('app/chat/firebase', ['setPostsRef']),
        ...mapState('app/chat/firebase', ['posts']),
        init_fire() {
            // firestoreのpostsをバインド
            console.log(this.posts)
        },
        sendData() {
            // データのチェック
            if (this.message === '' || this.message.length > 100) {
                return false
            }
            const dbdata = {
                text: this.message,
                send_uid: 10,
                receive_uid: 12,
                idRead: false,
                created: firebase.firestore.FieldValue.serverTimestamp()
            }
            // データの登録
            db.collection(
                `/chat_rooms/${this.$route.params.room_id}/messages`
            ).add(dbdata)
        }
    }
}
</script>
