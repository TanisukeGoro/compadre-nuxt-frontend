<template>
    <v-carousel hide-delimiters show-arrows-on-hover>
        <v-carousel-item v-for="(color, i) in colors" :key="color">
            <v-sheet :color="color" height="100%" tile>
                <v-row align="center" justify="center">
                    <div class="display-3">
                        <v-card
                            :loading="loading"
                            class="mx-auto"
                            max-width="100%"
                            light
                        >
                            <v-img
                                height="200"
                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                            ></v-img>

                            <v-card-title style="font-weight: bold;"
                                >スポットの名前</v-card-title
                            >
                            <v-card-text>
                                <div class="my-4 subtitle-1 text">
                                    住所:東京都江東区青海１丁目３−１５
                                </div>

                                <div>地図のURL</div>
                            </v-card-text>
                            <v-card-actions style="justify-content: center;">
                                <div class="text-center">
                                    <v-btn
                                        rounded
                                        dark
                                        style="background: linear-gradient(to right, #70e1f5, #ffd194);"
                                        >SEND</v-btn
                                    >
                                </div>
                            </v-card-actions>
                        </v-card>
                        {{ i + 1 }}
                    </div>
                </v-row>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>
<script>
export default {
    data() {
        return {
            colors: ['#fafafa', '#fafafa', '#fafafa', '#fafafa', '#fafafa']
        }
    }
}
</script>
