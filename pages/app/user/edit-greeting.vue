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
        <component
            :is="componentState"
            v-model="model"
            :candidates="greetings"
            :hide-delimiters="hideDelimiters"
            :show-arrows="showArrows"
            :card-mode="cardMode"
        />
    </v-app>
</template>

<script>
// import { mapGetters } from 'vuex'
// import SelectCard from '~/components/greetings/SelectCard'
import EditGreeting from '~/components/greetings/EditGreeting'
import SelectCardSlideTest from '~/components/SelectCardSlideTest'

export default {
    components: {
        Default: SelectCardSlideTest,
        Edit: EditGreeting
        // Empty:
    },
    data() {
        return {
            model: 1,
            showArrows: true,
            hideDelimiters: true,
            cycle: false,
            dialog: false,
            greetings: [],
            cardMode: 'preview',
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
    watch: {
        dialog() {
            console.log(this.dialog)
        },
        model() {
            console.log(this.model)
        }
    },
    asyncData({ $axios, $auth }) {
        return $axios.$get(`${process.env.apiBaseUrl}greetings`).then((res) => {
            if (res.length === 0) {
                res.push({
                    content: `挨拶カードはまだありません!!\n新しく作ってみましょう！`,
                    fst_hashtag: '',
                    hash_id: '',
                    media_url: '',
                    snd_hashtag: '',
                    trd_hashtag: ''
                })
            }

            let greetingsArr = []
            // SlectCardSlidのデータ構造に合わせる
            for (let i = 0; i < res.length; i++) {
                let user = $auth.state.user
                user.greetings = [res[i]]
                let set = Object.assign({}, user)
                greetingsArr.push(set)
                console.log(greetingsArr)
            }
            return { greetings: greetingsArr }
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
