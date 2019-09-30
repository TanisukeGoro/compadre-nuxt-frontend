<template>
    <v-card
        class="mx-auto"
        max-width="400"
        theme--dark
        elevation="5"
        style="border-radius: 1em;"
    >
        <v-card-title>
            <v-list-item-avatar color="grey darken-3">
                <v-img class="elevation-6" src></v-img>
            </v-list-item-avatar>
            <span class="subtitle-1 font-weight-bold"
                >Hello! "name"and"name"</span
            >
        </v-card-title>

        <v-card-text class="subtitle-2 font-weight-bold">
            こんにちは！
            <br />このアプリを運営しているhomieです。 <br />”name”さんと
            行ってみたい場所を選んで提案しみてはいかがですか？
            <br />行ってみたい場所を選んでください。
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        //
    })
}
</script>
