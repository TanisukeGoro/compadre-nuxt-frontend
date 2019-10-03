<template>
    <v-app>
        <v-app-bar app clipped-right color="primary" fixed dark>
            <v-app-bar-nav-icon
                to="/app/user-profile"
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-spacer></v-spacer>

            <v-toolbar-title>{{ title }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-app-bar-nav-icon
                @click.stop="drawerRight = !drawerRight"
            ></v-app-bar-nav-icon>
        </v-app-bar>
        <!-- v-content, v-contentはコンポーネントへの影響力が高いので削除 -->
        <nuxt />
        <BottomNav />
    </v-app>
</template>

<script>
import BottomNav from '~/components/BottomNav'

export default {
    components: {
        BottomNav
    },
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            title: process.env.title,
            items: [
                {
                    icon: 'mdi-apps',
                    title: 'Welcome',
                    to: '/'
                },
                {
                    icon: 'mdi-chart-bubble',
                    title: 'Inspire',
                    to: '/inspire'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false
        }
    }
}
</script>
