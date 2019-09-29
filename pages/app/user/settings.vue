<template>
    <v-content>
        <distanceSlider />
        <ageSlider />
        <languageSerect />
        <countrySerect />
        <jobsSerect />
        <v-btn @click="$auth.logout()">Logout</v-btn>
        <v-btn to="/store-test" nuxt>Storeのテスト</v-btn>
    </v-content>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import distanceSlider from '~/components/distanceSlider'
// eslint-disable-next-line no-unused-vars
import ageSlider from '~/components/ageSlider'
// eslint-disable-next-line no-unused-vars
import languageSerect from '~/components/languageSerect'
// eslint-disable-next-line no-unused-vars
import countrySerect from '~/components/countrySerect'
// eslint-disable-next-line no-unused-vars
import jobsSerect from '~/components/jobsSerect'

export default {
    components: {
        distanceSlider,
        ageSlider,
        // eslint-disable-next-line vue/no-unused-components
        countrySerect,
        languageSerect,
        jobsSerect
    }
}
</script>
