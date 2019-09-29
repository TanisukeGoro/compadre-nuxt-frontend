<template>
    <v-container>
        <v-list
            v-for="(item, index) in lineCount"
            :key="index"
            color="background"
            height="6px"
        >
            <v-list-item></v-list-item>
        </v-list>
        <v-footer fixed inset padless>
            <v-layout row wrap>
                <v-row justify="center" no-gutters class="my-2 mx-0">
                    <v-col sm="6" xs="12">
                        <v-layout wrap align-end justify-center>
                            <v-flex xs1 class="pb-2">
                                <v-icon @click="debug">mdi-camera</v-icon>
                            </v-flex>
                            <v-flex xs9>
                                <v-textarea
                                    v-model="message"
                                    append-outer
                                    hide-details
                                    rounded
                                    rows="1"
                                    clearable
                                    color="accent"
                                    class="textarea pa-0"
                                    clear-icon="mdi-close-circle"
                                    auto-grow
                                ></v-textarea>
                            </v-flex>
                            <v-flex xs1 class="pb-2 pl-1">
                                <v-icon
                                    :color="message && 'accent'"
                                    @click="sendData"
                                >
                                    mdi-send
                                </v-icon>
                            </v-flex>
                        </v-layout>
                    </v-col>
                </v-row>
            </v-layout>
        </v-footer>
    </v-container>
</template>

<script>
import { firebase, db } from '~/plugins/firebase.js'
export default {
    data() {
        return {
            message: ''
        }
    },
    computed: {
        lineCount() {
            const line =
                this.message === null
                    ? 1
                    : this.message.match(/\n/g)
                    ? this.message.match(/\n/g).length + 1
                    : 1
            return line
        }
    },
    mounted() {},
    methods: {
        debug() {
            console.log(
                this.message.match(/\n/g) ? this.message.match(/\n/g).length : 0
            )
        },
        async sendData() {
            // データのチェック
            if (this.message === '') {
                return false
            }
            const dbdata = {
                text: this.message,
                send_uid: this.$auth.state.user.id,
                receive_uid: 12,
                idRead: false,
                created: firebase.firestore.FieldValue.serverTimestamp()
            }
            const self = this
            // データの登録
            await db
                .collection(
                    `/chat_rooms/${this.$route.params.room_id}/messages`
                )
                .add(dbdata)
                .then((results) => {
                    window.scrollTo(0, document.body.clientHeight)
                    self.message = ''
                })
                .catch(function(error) {
                    console.error('Error writing document: ', error)
                })
        }
    }
}
</script>

<style scoped>
.textarea {
    border: solid 2px #95999e;
    border-radius: 10px;
    font-size: 16px;
    padding: 0;
}
</style>
