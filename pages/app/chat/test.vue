<template>
  <v-app>
    <v-container>
      <v-layout v-for="(msg, index) in messages" :key="index">
        <v-row>
          <div :class="{ 'flex-grow-1': msg === 1 }"></div>

          <v-col>
            <v-card class="pa-2" outlined tile>
              あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
            </v-card>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'chat',
  data() {
    return {
      messageInputHeight: '48px',
      message: '',
      messages: [
        { text: 'メッセージ1', sender: 1 },
        { text: 'メッセージ2', sender: 1 },
        { text: 'メッセージ3', sender: 2 },
        { text: 'メッセージ4', sender: 1 },
        { text: 'メッセージ4', sender: 1 },
        { text: 'メッセージ4', sender: 1 },
        { text: 'メッセージ5', sender: 2 },
        { text: 'メッセージ6', sender: 2 }
      ],
      directMessages: this.$store.state.directMessages
    }
  },
  created() {},
  updated() {},
  methods: {
    sendMessage() {},
    getMessages() {}
  }
}
</script>

<style scoped>
/* .message {
  border-radius: 20.8px;
} */
/* h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>

<!-- <v-container v-if="messages.length" grid-list-xl fluid row>
            <v-layout
                v-for="(msg, index) in messages"
                :key="index"
                row
                :align-start="msg.sender === 1"
                :align-end="msg.sender !== 1"
                :align-content-start="msg.sender === 1"
                :align-content-end="msg.sender !== 1"
            >
                <v-flex
                    xs6
                    sm4
                    :offset-xs6="msg.sender === 1"
                    :offset-sm8="msg.sender === 1"
                >
                    <v-card
                        class="msg"
                        :color="msg.sender !== 1 ? 'white' : 'blue'"
                    >
                        <v-card-text
                            :class="
                                msg.sender !== 1 ? 'black--text' : 'white--text'
                            "
                        >
                            {{ msg.text }}
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container v-else fluid>
            <v-card color="secondary">
                <v-card-text>
                    <v-icon class="pa-2">info</v-icon>
                    Hey, it doesn't look like you two have spoken before! Say hi
                    and introduce yourself.
                </v-card-text>
            </v-card>
        </v-container> -->
