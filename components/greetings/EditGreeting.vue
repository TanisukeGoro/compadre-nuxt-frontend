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
                <v-textarea
                    v-model="props_content"
                    class="card-text__font pa-2"
                    auto-grow
                    color="accent"
                    autofocus
                    clearable
                    placeholder="'What do you want to do?'"
                    label="Edit Greeting"
                    :counter="counter"
                    rows="1"
                ></v-textarea>
                <v-btn-toggle multiple mandatory>
                    <v-btn text width="100px" height="30px" @click="editCancel"
                        >cancel</v-btn
                    >
                    <v-btn
                        color="accent"
                        height="30px"
                        width="100px"
                        @click="editSave"
                    >
                        save
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
            type: String,
            default: 'no text...'
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
            counter: 200,
            props_content: this.content
        }
    },
    methods: {
        /**
         * 編集をセーブする関数
         *
         * もしhash_idが空なら新規投稿
         * もしhash_idがあれば更新
         */
        editSave(e) {
            // axiosの通信のあとでthisを参照できなくなるので、ここでやってしまう
            const self = this
            if (this.hashId) {
                this.$axios
                    .$put(`${process.env.apiBaseUrl}greetings`, {
                        greeting_hash: this.hashId,
                        content: this.props_content
                    })
                    .then((_res) => {
                        self.$emit('returnEditFromChild', { _res })
                    })
            } else {
                this.$axios
                    .$post(`${process.env.apiBaseUrl}greetings`, {
                        content: this.props_content
                    })
                    .then((_res) => {
                        self.$emit('returnEditFromChild', { _res })
                    })
            }
        },
        editCancel() {
            this.$emit('cancelEditFromChild')
            console.log('debug seve')
        }
    }
}
</script>

<style scoped>
.card-text__font {
    font-size: 20px;
    font-weight: 580;
    line-height: 32px;
    color: #fff;
}
.v-textarea textarea {
    line-height: 32px;
}
</style>
