<template>
  <v-card class="selectcard">
    <v-card class="mx-auto" max-width="344" flat>
      <v-list-item three-line>
        <v-list-item-avatar tile size="80">
          <v-img
            class="elevation-6 profileimg"
            style="border-radius:50%;"
            max-width="100px"
            src="https://scontent.ffuk4-1.fna.fbcdn.net/v/t1.0-1/p320x320/10393771_1392453211044724_430063713553090743_n.jpg?_nc_cat=106&_nc_oc=AQkSqb-ptorYtsY7QVWQ6obDOkta6OQu_k1Du-vlqemEf_S4rFjmLMLrDKhXdGkqppIdccddclPKkMCQRkOLUUEB&_nc_ht=scontent.ffuk4-1.fna&oh=b3454915b977e13c6c43eee5e8005f6c&oe=5E0806D2"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            {{ name }},
            <span style="font-size:18px">{{ birthday }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ presentLocation }}
            <br />
            {{ jobType }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-row>
      <v-card-text class="title font-weight-bold pb-0 pt-0 greetingarea">{{
        content
      }}</v-card-text>
    </v-row>
    <v-layout>
      <v-list class="mr-3">
        <v-icon>mdi-access-point</v-icon>
      </v-list>
      <v-list class="mr-3">{{ fstLang }}</v-list>
      <v-list class="mr-3">{{ sndLang }}</v-list>
      <v-list class="mr-3">{{ trdLang }}</v-list>
    </v-layout>
    <v-row>
      <v-container fluid>
        <LikeButton @ClickLikebutton="ClickLikeButton" />
      </v-container>
    </v-row>
  </v-card>
</template>

<script>
import '@/assets/selectcard.css'
import LikeButton from '~/components/LikeButton'
export default {
  components: {
    LikeButton
  },
  props: {
    name: {
      type: String,
      default: 'Untitle...' //
    },
    jobType: {
      type: String,
      default: '' //
    },
    presentLocation: {
      type: String,
      default: 'Tokyo.Shibuya' //
    },
    birthday: {
      type: Number,
      default: 0 //
    },
    fstLang: {
      type: String,
      default: '1言語...' //
    },
    sndLang: {
      type: String,
      default: '2言語...' //
    },
    trdLang: {
      type: String,
      default: '3言語...' //
    },
    uicon: {
      type: String,
      default: '' // アイコンがからだった時の画像データを差し込んでおく。
    },
    like: {
      type: Number,
      default: 0
    },
    hashId: {
      type: String,
      default: ''
    },
    content: {
      type: [String, Array],
      default: () => ['']
    },
    mediaUrl: {
      type: String,
      default: ''
    },
    fstHashtag: {
      type: String,
      default: ''
    },
    sndHashtag: {
      type: String,
      default: ''
    },
    trdHashtag: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      counter: 200
      // cardText: this.content
    }
  },
  computed: {
    cardText() {
      return this.content
    }
  },
  methods: {
    previousCard() {
      this.$emit('previousCardFromChild')
    },
    nextCard() {
      this.$emit('nextCardFromChild')
    },
    ClickLikeButton() {
      alert('クリックされました')
    }
  }
}
</script>
<script>
window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: './' })
  }
})
</script>

<style></style>
