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
import distanceSlider from '~/components/settings/distanceSlider'
import ageSlider from '~/components/settings/ageSlider'
import languageSerect from '~/components/settings/languageSerect'
import countrySerect from '~/components/settings/countrySerect'
import jobsSerect from '~/components/settings/jobsSerect'

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
