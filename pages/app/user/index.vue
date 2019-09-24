<template>
    <v-app>
        <v-content>
            <v-container>
                <v-list subheader>
                    <v-subheader>User infomation</v-subheader>
                    <v-list-item
                        v-for="uinfo in Object.keys($auth.$state.user)"
                        :key="uinfo"
                    >
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="uinfo"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                                v-text="$auth.$state.user[uinfo]"
                            ></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-container>
            <v-btn color="info" to="user/settings">settings</v-btn>
            <v-btn color="info" to="user/edit-greeting">edit-greeting</v-btn>
            <v-btn color="info" to="user/edit-profile">edit-profile</v-btn>
            <v-btn color="error" @click="$auth.logout()">Logout</v-btn>
        </v-content>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters('app/chat/firebase', ['posts'])
    }
}
</script>
