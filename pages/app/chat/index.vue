<template>
  <v-app v-if="chatLists.length !== 0">
    <v-content>
      <v-list subheader>
        <v-subheader>Recent chat</v-subheader>
        <v-list-item
          v-for="chat in chatLists"
          :key="chat.title"
          :to="`chat/${chat.hashed_room_id}`"
          nuxt
        >
          <v-list-item-avatar>
            <v-img :src="chat.toTolk_uinfo.icon_url"></v-img>
            <!-- <v-img :src="iconURL"></v-img> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              v-text="chat.toTolk_uinfo.name"
            ></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="chat.active ? 'accent accent-4' : 'grey'"
              >mdi-message</v-icon
            >
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-content>
  </v-app>
  <v-app v-else>
    <v-container>
      <NoChatPartner />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NoChatPartner from '~/components/NoChatPartner'

export default {
  components: {
    NoChatPartner
  },
  data: () => ({
    // AWSの画像だったら爆速で取ってこれる感じか。
    iconURL: `${process.env.AwsStoreImageUrl}images/GDayPwYX4Ioeknxb6R6Dbn9eDHXdr2NNy94Dctp5.jpeg`,
    No_chat_partner: true
  }),
  computed: {
    ...mapGetters('app/chat/chatList', ['chatLists'])
  },
  async fetch({ store, $axios }) {
    await $axios.$get(`${process.env.apiBaseUrl}matching`).then((res) => {
      store.dispatch('app/chat/chatList/getChatList', res, { root: true })
    })
  },
  methods: {
    ...mapActions('app/chat/chatList', ['getChatList'])
  }
}
</script>
