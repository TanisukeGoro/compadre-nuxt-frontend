<script>
/**
 * 挨拶の投稿・編集・削除を行う。
 *
 * deleteの前に削除していいのか確認をとった方がいい。
 * 編集に関してはDialogのFullscreenを使った方がいい気がする。
 *
 */
</script>
<template>
    <v-app>
        <v-content>
            <v-container>
                <v-card id="create" class="v__height" flat>
                    <div v-if="currentGreeting !== null">
                        <component
                            :is="componentState"
                            :name="$auth.state.user.name"
                            :uicon="$auth.state.user.icon_url"
                            :like="20"
                            :content="greetings[greeting_count].content"
                            :hash-id="greetings[greeting_count].hash_id"
                            :media-url="greetings[greeting_count].media_url"
                            @returnEditFromChild="returnEdit($event)"
                            @cancelEditFromChild="cancelEdit()"
                            @previousCardFromChild="previousGreeting()"
                            @nextCardFromChild="nextGreetng()"
                        ></component>
                    </div>

                    <!-- <v-btn color="success" @click="getGreetings">テスト</v-btn> -->
                    <v-speed-dial
                        v-model="fab"
                        :top="false"
                        :bottom="true"
                        :right="true"
                        :left="false"
                        :direction="'top'"
                        :open-on-hover="true"
                        :transition="'scale-transition'"
                    >
                        <template v-slot:activator>
                            <v-btn v-model="fab" color="blue darken-2" dark fab>
                                <v-icon v-if="fab">mdi-close</v-icon>
                                <v-icon v-else
                                    >mdi-pencil-box-multiple-outline</v-icon
                                >
                            </v-btn>
                        </template>
                        <v-btn
                            fab
                            dark
                            small
                            color="green"
                            @click="editGreeting"
                        >
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn
                            fab
                            dark
                            small
                            color="indigo"
                            @click="newGreeting"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <v-btn
                            fab
                            dark
                            small
                            color="red"
                            @click="deleteGreeting"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-speed-dial>
                </v-card>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
// import { mapGetters } from 'vuex'
import SelectCard from '~/components/SelectCard'
import EditGreeting from '~/components/EditGreeting'

export default {
    components: {
        Default: SelectCard,
        Edit: EditGreeting
        // Empty:
    },
    data() {
        return {
            greetings: [],
            greeting_count: 0,
            greeting_i: 0,
            fab: false,
            currentGreeting: '',
            currentGreetingContent: '',
            currentGreetingHash: '',
            currentGreetingMedia_url: '',
            componentState: 'Default'
        }
    },
    computed: {
        activeFab() {
            switch (this.tabs) {
                case 'one':
                    return { class: 'purple', icon: 'account_circle' }
                case 'two':
                    return { class: 'red', icon: 'edit' }
                case 'three':
                    return { class: 'green', icon: 'keyboard_arrow_up' }
                default:
                    return {}
            }
        }
    },
    asyncData({ $axios }) {
        return $axios.$get(`${process.env.apiBaseUrl}greetings`).then((res) => {
            if (res.length === 0) {
                res.push({
                    content: '',
                    fst_hashtag: '',
                    hash_id: '',
                    media_url: '',
                    snd_hashtag: '',
                    trd_hashtag: ''
                })
            }
            return { greetings: res }
        })
    },
    created() {
        // 自分の挨拶文が登録されていない場合は登録する
        if (
            this.greetings.length > 0 &&
            this.$auth.state.user.current_greet_hash == null
        ) {
            this.$axios
                .$put(`${process.env.apiBaseUrl}user`, {
                    current_greet_hash: this.greetings[0].hash_id
                })
                .then((i) => console.log(i))
        }
        // this.currentGreeting = this.greetings[this.greeting_count]
        // console.log(this.currentGreeting)
    },
    methods: {
        getGreetings() {},

        editGreeting() {
            this.componentState = 'Edit'
        },

        /**
         * 編集画面から戻って来るため
         */
        returnEdit(editedContent) {
            this.greetings[this.greeting_count].content =
                editedContent._res.content
            this.componentState = 'Default'
        },
        cancelEdit() {
            this.componentState = 'Default'
        },
        newGreeting() {
            // greetingsにオブジェクトを追加して反映
            this.greetings.push({
                content: '',
                fst_hashtag: '',
                hash_id: '',
                media_url: '',
                snd_hashtag: '',
                trd_hashtag: ''
            })
            this.greeting_count = this.greetings.length - 1
            this.componentState = 'Edit'
        },
        deleteGreeting() {
            const self = this
            this.$axios
                .$delete(
                    `${process.env.apiBaseUrl}greetings?hash_id=${this.greetings[this.greeting_count].hash_id}`
                )
                .then((_res) => {
                    if (_res.results === 200) {
                        self.greetings.pop(self.greeting_count)
                        self.greeting_count = 0
                    }
                })
        },
        nextGreetng() {
            this.greeting_count < this.greetings.length - 1 &&
                this.greeting_count++
        },
        previousGreeting() {
            this.greeting_count > 0 && this.greeting_count--
        }
    }
}
</script>
<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
    position: absolute;
}
#create .v-btn--floating {
    position: relative;
}
.v__height {
    /* 全体の高さを100vhとした時に
     * headerとfooterがそれぞれ 56px
     * カードのpaddingが上下にそれぞれ12px
     * なのでそれを差し引いたでピッタリになるはず
     */
    height: calc(100vh - 136px);
}
</style>
