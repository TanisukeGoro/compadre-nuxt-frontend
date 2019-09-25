<template>
    <v-content>
        <v-btn @click="$auth.logout()">Logout</v-btn>
        <v-btn to="/store-test" nuxt>Storeのテスト</v-btn>
    </v-content>
</template>
