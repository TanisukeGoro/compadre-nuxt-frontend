<template>
  <v-app>
    <v-content>
      {{ 'jp' | countryCode2countryName }}
      <v-carousel
        height="100%"
        :hide-delimiters="true"
        :show-arrows="true"
        :cycle="false"
        :light="true"
        :continuous="false"
      >
        {{ candidatesarry.length }}
        <v-carousel-item
          v-for="candidate in candidatesarry"
          :key="candidate.candidateId"
        >
          <v-card
            height="100%"
            max-width="344"
            class="mx-auto pt-4"
            flat
            color="background"
          >
            <v-list-item>
              <v-list-item-avatar color="grey" size="72">
                <v-img
                  src="https://the-madison.s3-ap-northeast-1.amazonaws.com/images/wg5TX0SUwAptlVftxw1dlEG5iZewrwoinKOvmPbw.jpeg"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline  grey--text text--darken-3">
                  User Name
                </v-list-item-title>
                <v-list-item-subtitle class="grey--text text--darken-1">
                  <p class="inline iti-flag jp mr-1"></p>
                  日本 32歳
                </v-list-item-subtitle>
                <v-list-item-subtitle class="grey--text text--darken-1">
                  職業 / エンジニアとか
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-text class="subtitle-1 grey--text text--darken-3">
              夜だろうか」「おまた点つくしかいがおりようと思っていらしく、本をもう行った川へなんかくひょうせきが。
            </v-card-text>

            <v-divider color="grey"></v-divider>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="subtitle-2 grey--text">
                  <v-icon class="mr-3 grey--text">mdi-voice</v-icon>
                  {{ 'JA' | langCode2langName }},
                  {{ 'ES' | langCode2langName }},
                  {{ 'SW' | langCode2langName }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-flex xs1>
                <v-btn color="accent" absolute bottom @click="onClick">
                  Hi !
                </v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      counter: 200,
      storemodel: this.$store.getters['app/candidate/model'],
      model: this.$store.getters['app/candidate/model'],
      showArrows: true,
      hideDelimiters: true,
      cycle: false,
      nextState: true,
      jobCode: {
        1: '事務・オフィス系',
        2: '販売・飲食・サービス系',
        3: 'IT・エンジニア系',
        4: 'Web・クリエイター系',
        5: '医療・介護・福祉系',
        6: '研究機関・教育系',
        7: '商社・金融・経営',
        8: '学生'
      },
      langCode: {
        ja: '日本語',
        zh: '中国語',
        en: '英語',
        be: 'ロシア語',
        pt: 'ポルトガル語',
        es: 'スペイン語',
        fr: 'フランス語',
        de: 'ドイツ語',
        it: 'イタリア語',
        ms: 'マレー語',
        tl: 'フィリピン語',
        vi: 'ベトナム語',
        th: 'タイ語',
        tw: '台湾語'
      }
      // cardText: this.content
    }
  },
  computed: {
    // コンピューテッドは算出プロパティ
    cardText() {
      return this.content
    },
    onchange() {
      // return this.$store.getters['app/candidate/model']
      const modeling = this.model
      this.$store.commit('app/candidate/linkToModel', modeling)
      return this.model
    },
    candidatesarry() {
      return this.$store.getters['app/candidate/candidates']
    }
  },
  watch: {
    onchange(currentNumber) {
      this.$nextTick(() => {
        if (this.candidatesarry.length - currentNumber === 5) {
          if (this.candidatesarry.length >= 40) {
            this.model = this.model - 10
            const currentNum = this.model
            this.$store.commit('app/candidate/spliceCandidate', currentNum)
            return
          }
          this.getCandidate()
        }
      })
      return this.model
    }
  },
  mounted() {},
  methods: {
    // バインディングヘルパーを使う
    ...mapActions('app/candidate', [
      'getCandidate',
      'popCandidate',
      'getCandidateUpdate',
      'spliceCandidate'
    ]),
    ...mapState('app/candidate', ['candidates']),
    // ↓この二つはいらないぽい
    // ...mapActions('comman/auth', ['loginUserData']),
    // ...mapState('comman/auth', ['data']),

    previousCard() {
      this.$emit('previousCardFromChild')
    },
    nextCard() {
      this.$emit('nextCardFromChild')
    },
    ClickLikeButton() {
      alert(
        JSON.stringify(
          this.$store.getters['app/candidate/candidates'][this.model]
        )
      )
      this.likeUser(
        this.$store.getters['app/candidate/candidates'][this.model].id
      )
      this.model++
    },
    bindCarousel(e) {
      //
    },
    /**
     * ユーザーによるいいねをPOSTしてる。
     * nuxtStateで連打による誤作動を防止している。
     */
    async postUserLike(LikedID) {
      this.nextState = false
      try {
        await this.$axios.$post(`${process.env.apiBaseUrl}matching/like`, {
          userId_you: LikedID
        })

        this.nextState = true
      } catch (error) {}
    },
    async matchingUser(LikedID) {
      this.nextState = false
      try {
        await this.$axios.$post(`${process.env.apiBaseUrl}matching`, {
          userId_you: LikedID
        })
      } catch (error) {}
    },
    /**
     * ユーザーのいいねのPOSTが完了してから次のユーザーを呼び出す。
     */
    likeUser(LikedID) {
      if (
        this.$store.getters['app/candidate/candidates'][this.model]
          .has_user_voted
      ) {
        this.matchingUser(LikedID)
      }
      this.postUserLike(LikedID)
    },
    /**
     * 誕生日を計算して年齢を出し、birthdayを書き換える関数
     */ getage(birth) {
      const year = Number(birth.split('-')[0])
      const month = Number(birth.split('-')[1])
      const day = Number(birth.split('-')[2])
      //

      // 誕生年月日
      const birthday = new Date(year, month - 1, day)

      // 今日
      const today = new Date()

      // 今年の誕生日
      const thisYearBirthday = new Date(
        today.getFullYear(),
        birthday.getMonth(),
        birthday.getDate()
      )

      // 今年-誕生年
      const age = today.getFullYear() - birthday.getFullYear()

      // 今年の誕生日を迎えていなければage-1を返す
      // this.birthday = today < thisYearBirthday ? age - 1 : age
      return today < thisYearBirthday ? age - 1 : age
    },
    job(job) {
      return this.jobCode[job]
    },
    job_conversion(jobNum) {
      if (this.jobCode[jobNum]) {
        return this.jobCode[jobNum]
      } else {
        return ''
      }
    },
    greetingPullOut(OnePeople) {
      const tmp = Object.keys(OnePeople.greetings).map((key) => {
        return OnePeople.greetings[key]
      })
      if (tmp.length === 0) {
        return '挨拶文はありません'
      } else {
        return tmp[0].content
      }
    }
  }
}
</script>

<style>
.align-center {
  margin: auto;
}
.inline {
  transform: scale(1.2);
  display: inline-block;
  margin-bottom: 0 !important;
}
</style>
