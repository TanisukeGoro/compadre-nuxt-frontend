<template>
    <v-app>
        <v-app-bar app clipped-right color="primary" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-app-bar-nav-icon
                @click.stop="drawerRight = !drawerRight"
            ></v-app-bar-nav-icon>
        </v-app-bar>
        <nuxt />
    </v-app>
</template>

<script>
export default {
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
