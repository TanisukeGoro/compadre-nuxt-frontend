<template>
  <v-content>
    <ChatHeader />
    <ChatBottomNav />
  </v-content>
</template>

<script>
import ChatHeader from '~/components/ChatHeader'
import ChatBottomNav from '~/components/ChatBottomNav'
export default {
  layout: 'empty',
  components: {
    ChatHeader,
    ChatBottomNav
  },
  methods: {}
}
</script>

<style></style>
