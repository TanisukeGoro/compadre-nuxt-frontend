<template>
    <v-row>
        <v-col class="ma-3">
            <v-card
                class="mx-auto"
                max-width="400"
                min-height="300px"
                :color="null"
                flat
            >
                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                            <v-img class="elevation-6" :src="uicon"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{ name }}</v-list-item-title>
                        </v-list-item-content>

                        <v-row align="center" justify="end">
                            <v-icon class="mr-1">mdi-heart</v-icon>
                            <span class="subheading mr-2">{{ like }}</span>
                        </v-row>
                    </v-list-item>
                </v-card-actions>
                <v-card-text class="headline font-weight-bold">
                    <div
                        v-for="(text, index) in cardText.split('\n')"
                        :key="index"
                    >
                        {{ text }}
                    </div>
                </v-card-text>
                <v-btn-toggle multiple mandatory>
                    <v-btn
                        text
                        width="100px"
                        height="30px"
                        @click="previousCard"
                        >previous</v-btn
                    >
                    <v-btn
                        color="accent"
                        height="30px"
                        width="100px"
                        @click="nextCard"
                    >
                        next
                    </v-btn>
                </v-btn-toggle>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: 'Untitle...' //
        },
        uicon: {
            type: String,
            default: '' // アイコンがからだった時の画像データを差し込んでおく。
        },
        like: {
            type: Number,
            default: 0
        },
        hashId: {
            type: String,
            default: ''
        },
        content: {
            type: [String, Array],
            default: () => ['']
        },
        mediaUrl: {
            type: String,
            default: ''
        },
        fstHashtag: {
            type: String,
            default: ''
        },
        sndHashtag: {
            type: String,
            default: ''
        },
        trdHashtag: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            counter: 200
            // cardText: this.content
        }
    },
    computed: {
        cardText() {
            return this.content
        }
    },
    methods: {
        previousCard() {
            this.$emit('previousCardFromChild')
        },
        nextCard() {
            this.$emit('nextCardFromChild')
        }
    }
}
</script>

<style>
.card-text__font {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
}
.v-textarea textarea {
    line-height: 32px;
}
</style>
