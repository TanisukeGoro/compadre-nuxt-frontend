<template>
  <v-card
    class="mx-auto"
    max-width="400"
    theme--dark
    elevation="5"
    style="border-radius: 1em;"
    flat
  >
    <v-card-title>
      <v-list-item-avatar color="grey darken-3">
        <v-img class="elevation-6" src="/icon.png" />
      </v-list-item-avatar>
      <span class="subtitle-1 font-weight-bold"
        >Hello! {{ this.$auth.state.user.name }} and
        {{ toTalkUser.toTolk_uinfo.name }}</span
      >
    </v-card-title>

    <v-card-text class="subtitle-2 font-weight-bold">
      <p v-if="!isAnswer">
        こんにちは！<br />
        このアプリを運営しているhomieです。<br />
        {{ toTalkUser.toTolk_uinfo.name }} さんと
        行ってみたい場所を選んで提案しみてはいかがですか？<br />
        行ってみたい場所を選んでください。
      </p>
      <p v-else>
        回答ありがとうございます！
      </p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    toTalkUser: {
      type: Object,
      default: () => {
        return {
          toTolk_uinfo: {
            name: 'untitle'
          }
        }
      }
    },
    answerStatus: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    //
  }),
  computed: {
    isAnswer() {
      return this.answerStatus
    }
  }
}
</script>
