<template>
    <v-app :style="{ background: $vuetify.theme.themes['light'].secondary }">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12 mb-3">
                            <v-toolbar color="primary" dark flat>
                                <v-spacer></v-spacer>
                                <v-toolbar-title
                                    class="logoText--text logo-font"
                                >
                                    Open world and mind</v-toolbar-title
                                >
                                <div class="flex-grow-1"></div>
                            </v-toolbar>

                            <v-list
                                align="center"
                                justify="center"
                                style="padding-bottom:5%;"
                            >
                                <v-list>
                                    <v-btn
                                        class="ma-2"
                                        outlined
                                        color="primary"
                                        style="width:300px; border-radius:10px;"
                                        to="/app/select"
                                        >Login</v-btn
                                    >
                                </v-list>
                                <v-btn
                                    color="primary"
                                    style="width:300px; border-radius:10px;"
                                    to="/signup"
                                    nuxt
                                    >Sign Up</v-btn
                                >
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>
