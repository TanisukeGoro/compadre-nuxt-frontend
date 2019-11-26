<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            app
            fixed
            temporary
            width="220"
            color="primary"
            class="white--text"
        >
            <v-list-item>
                <v-list-item-avatar>
                    <v-avatar size="30">
                        <v-img :src="iconUrl | avatarIconUrl"></v-img>
                    </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="white--text">{{
                        $auth.state.user.name
                    }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="item.to"
                    nuxt
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list @click="$auth.logout()">
                <v-list-item-action class="px-4">
                    <v-btn class="error--text" text @click="$auth.logout()"
                        >Logout</v-btn
                    >
                </v-list-item-action>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app clipped-right color="primary" height="55" fixed dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">
                <v-avatar size="30">
                    <v-img :src="iconUrl | avatarIconUrl"></v-img>
                </v-avatar>
            </v-app-bar-nav-icon>

            <v-spacer></v-spacer>

            <v-toolbar-title class="logo-font">{{ title }}</v-toolbar-title>

            <v-spacer></v-spacer>
            <!-- 消すとLogoの中央揃えが崩れるので困り者。
                色を変更して誤魔化す。
             -->
            <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight">
                <v-icon color="primary">mdi-settings-outline</v-icon>
            </v-app-bar-nav-icon>
        </v-app-bar>

        <!-- v-content, v-contentはコンポーネントへの影響力が高いので削除 -->
        <nuxt />
        <bottom-nav />
    </v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav'

export default {
    components: {
        BottomNav
    },
    data() {
        return {
            iconUrl: '',
            clipped: false,
            drawer: false,
            drawerRight: false,
            fixed: false,
            title: process.env.title,
            items: [
                {
                    icon: 'mdi-account-outline',
                    title: 'Profile',
                    to: '/app/user/user-profile'
                },
                {
                    icon: 'mdi-account-group-outline',
                    title: 'Friends',
                    to: '/inspire'
                },
                {
                    icon: 'mdi-settings-outline',
                    title: 'Edit Greetings',
                    to: '/app/user/edit-greeting'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false
        }
    },
    created() {
        this.iconUrl = this.$auth.state.user.icon_url
    }
}
</script>
<style>
body {
    background-color: #f4d03f;
}
</style>
