<template>
  <v-app>
    <v-content>
      <v-container grid-list-xl style="max-width: 600px;">
        <div v-for="(msg, index) in messages" :key="index">
          <v-message-date
            v-show="changeMessageNo.includes(index)"
            :key="index + 'date'"
            :message="msg"
          ></v-message-date>
          <v-layout column :align-end="msg.sender === 1">
            <v-flex>
              <v-messageTimestamp :is-own="msg.sender === 1" :message="msg">
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
      messageInputHeight: '48px',
      message: '',
      changeMessageNo: [],
      timestamps: [],
      messages: [
        {
          text: `ロングメッセージテスト
えたいの知れない不吉な塊が私の心を始終圧おさえつけていた。焦躁しょうそうと言おうか、嫌悪と言おうか――酒を飲んだあとに宿酔ふつかよいがあるように、酒を毎日飲んでいると宿酔に相当した時期がやって来る。そ`,
          sender: 1,
          timestamp: new Date('2019-12/22 19:20')
        },
        {
          text: 'メッセージ2',
          sender: 1,
          timestamp: new Date('2019-12/22 19:23')
        },
        {
          text: `ロングメッセージテスト
えたいの知れない不吉な塊が私の心を始終圧おさえつけていた。焦躁しょうそうと言おうか、嫌悪と言おうか――酒を飲んだあとに宿酔ふつかよいがあるように、酒を毎日飲んでいると宿酔に相当した時期がやって来る。そ`,
          sender: 2,
          timestamp: new Date('2019-12/22 19:34')
        },
        {
          text: 'メッセージ4',
          sender: 1,
          timestamp: new Date('2019-12/22 19:37')
        },
        {
          text: 'メッセージ5',
          sender: 1,
          timestamp: new Date('2019-12/22 20:02')
        },
        {
          text: 'メッセージ6',
          sender: 1,
          timestamp: new Date('2019-12/23 7:10')
        },
        {
          text: 'メッセージ7',
          sender: 2,
          timestamp: new Date('2019-12/24 3:20')
        },
        {
          text: 'メッセージ8',
          sender: 2,
          timestamp: new Date('2019-12/24 19:20')
        }
      ],
      directMessages: this.$store.state.directMessages,
      sendText: ''
    }
  },
  mounted() {
    this.refreshRender()
  },
  updated() {},
  methods: {
    refreshRender() {
      this.timestamps = []
      this.changeMessageNo = []
      this.messages.forEach((res, index) => {
        if (
          res.timestamp &&
          !this.timestamps.includes(res.timestamp.getDate())
        ) {
          this.timestamps.push(res.timestamp.getDate())
          this.changeMessageNo.push(index)
        }
      })
    },
    sendMessage() {},
    getMessages() {}
  }
}
</script>
