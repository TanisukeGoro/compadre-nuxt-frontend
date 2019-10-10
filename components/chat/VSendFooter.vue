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
                <v-icon>mdi-camera</v-icon>
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
                  @click="sendDataToFirebase"
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
import { mapGetters } from 'vuex'
import { firebase } from '~/plugins/firebase.js'
export default {
  data() {
    return {
      message: ''
    }
  },
  computed: {
    // VuexからPostsデータを取得
    ...mapGetters('app/chat/firebase', ['posts']),
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
  methods: {
    sendDataToFirebase() {
      // データのチェック
      if (this.message === '') {
        return false
      }
      const sendData = {
        text: this.message,
        send_uid: this.$auth.state.user.id,
        receive_uid: '',
        idRead: false,
        created: firebase.firestore.FieldValue.serverTimestamp()
      }
      const self = this

      let emitPromise = Promise.resolve()
      sendData.waitUntil = (p) => (emitPromise = p)

      this.$emit('sendDataFromChild', sendData)
      emitPromise.then((response) => {
        self.message = ''
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
