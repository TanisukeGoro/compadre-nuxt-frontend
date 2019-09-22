<template>
    <v-app>
        <Header />
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>
        <BottomNav />
    </v-app>
</template>

<script>
import Header from '~/components/Header'
import BottomNav from '~/components/BottomNav'

export default {
    components: {
        BottomNav,
        Header
    }
}
</script>
