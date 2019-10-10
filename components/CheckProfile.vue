<template>
  <v-card class="Checkselectcard">
    <v-card class="mx-auto" max-width="344" flat>
      <v-list-item three-line>
        <v-list-item-avatar tile size="80">
          <v-img
            class="elevation-6 profileimg"
            style="border-radius:50%;"
            max-width="100px"
          ></v-img>
        </v-list-item-avatar>
        <div style="overflow:scroll;">
          <div class="headline" style="overflow:scroll;">
            {{ name }}
            <span style="font-size:18px; overflow: scroll;">年齢</span>
          </div>
          <div class="subtitle-1 subtitle" style="color:#959595">
            Tokyo/shibuya
          </div>
          <div class="subtitle-1 subtitle" style="color:#959595">
            仕事データ
          </div>
        </div>
      </v-list-item>
    </v-card>
    <v-row>
      <v-card-text class="title font-weight-bold pb-0 pt-0 greetingarea"
        >テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</v-card-text
      >
    </v-row>
    <v-layout style="margin:0 auto;" max-width="500px">
      <v-list class="mr-3">
        <v-icon>mdi-access-point</v-icon>
      </v-list>
      <v-list class="mr-3">英語</v-list>
      <v-list class="mr-3">日本語</v-list>
      <v-list class="mr-3">チャイナご</v-list>
    </v-layout>
    <v-row>
      <v-container fluid>
        <LikeButton @ClickLikebutton="nextState && ClickLikeButton()" />
      </v-container>
    </v-row>
  </v-card>
</template>
<script>
import '@/assets/CheckProfile.css'
import LikeButton from '~/components/LikeButton'
export default {
  components: {
    LikeButton
  },
  props: {},
  data() {
    return {
      name: this.$auth.state.user.name
    }
  }
}
</script>

<style></style>
