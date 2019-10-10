<template>
  <v-app>
    <v-content>
      <v-container>
        <hr />
        {{ age }}
        <age-slider v-model="age" :min-age="minAge" :max-age="maxAge" />
        <hr />
        {{ country }}
        <country-select v-model="country" />
        <hr />
        {{ distance }}
        <distance-slider v-model="distance" />
        <hr />
        {{ job }}
        <jobs-select v-model="job" />
        <hr />
        {{ language }}
        <language-select v-model="language" />
        <v-btn @click="$auth.logout()">Logout</v-btn>
        <v-btn to="/store-test" nuxt>Storeのテスト</v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AgeSlider from '@/components/settings/AgeSlider'
import CountrySelect from '@/components/settings/CountrySelect'
import DistanceSlider from '@/components/settings/DistanceSlider'
import JobsSelect from '@/components/settings/JobsSelect'
import LanguageSelect from '@/components/settings/LanguageSelect'
export default {
  components: {
    AgeSlider,
    CountrySelect,
    DistanceSlider,
    JobsSelect,
    LanguageSelect
  },
  data() {
    return {
      /**
       * 年齢の設定と取得
       */
      age: 0,
      minAge: 18,
      maxAge: 100,

      /**
       * 国の設定と取得
       */
      country: 'not select',

      /**
       * 距離
       */
      distance: 20,

      /**
       * 職業
       */
      job: '',

      /**
       * 言語
       */
      language: ''
    }
  }
}
</script>
