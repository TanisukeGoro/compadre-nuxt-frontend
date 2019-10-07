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
            :carousel-count="model"
            :candidates="greetings"
            :hide-delimiters="hideDelimiters"
            :show-arrows="showArrows"
            :touchless="touchLess"
            :card-state="cardState"
            @fromSelectComponent="changeState($event)"
            @returnEditFromChild="returnEdit($event)"
            @cancelEditFromChild="cancelEdit"
        />
    </v-app>
</template>

<script>
// import { mapGetters } from 'vuex'
// import SelectCard from '~/components/greetings/SelectCard'
// import EditGreeting from '~/components/greetings/EditGreeting'
import GreetingCard from '~/components/GreetingCard'
import { state } from '../../../store/app/candidate'

export default {
    components: {
        Default: GreetingCard
        // Edit: EditGreeting
        // Empty:
    },
    data() {
        return {
            model: 0,
            preModel: 0, // 切り替え前の値保持
            showArrows: true,
            touchLess: false,
            hideDelimiters: true,
            cycle: false,
            dialog: false,
            greetings: [],
            cardState: 'preview',
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
        dialog() {},
        model() {},
        cardState() {
            switch (this.cardState) {
                case 'preview':
                    this.showArrows = true
                    this.touchLess = false
                    break
                case 'preview':
                    this.showArrows = true
                    this.touchLess = false
                    break
                case 'edit':
                    this.showArrows = false
                    this.touchLess = true
                    break

                default:
                    break
            }
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
            }
            return { greetings: greetingsArr }
        })
    },
    created() {
        // 自分の挨拶文が登録されていない場合は登録する
        if (
            this.greetings[0].greetings.length > 0 &&
            this.$auth.state.user.current_greet_hash === null
        ) {
            this.$axios.$put(`${process.env.apiBaseUrl}user`, {
                current_greet_hash: this.greetings[0].greetings[0].hash_id
            })
            // .then((i) => console.log(i))
        }
    },
    methods: {
        async getGreetings() {
            self = this

            await this.$axios
                .$get(`${process.env.apiBaseUrl}greetings`)
                .then((res) => {
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
                        let user = this.$auth.state.user
                        user.greetings = [res[i]]
                        let set = Object.assign({}, user)
                        greetingsArr.push(set)
                    }
                    self.greetings = greetingsArr
                })
        },
        changeState(state) {
            switch (state) {
                case 'edit':
                    this.editGreeting()
                    break
                case 'create':
                    this.createGreeting()
                    break

                case 'delete':
                    this.deleteGreeting()
                    break

                default:
                    break
            }
        },
        /**
         * カードを編集モードに変更する
         *
         * 編集するデータは単一なので渡すデータの単一なものにする
         *
         */
        editGreeting() {
            if (this.greetings[0].greetings[0].hash_id === '') {
                return !1
            }
            this.cardState = 'edit'
            this.preModel = this.model
            this.preGreetings = this.greetings
            // this.model = 0
        },
        createGreeting() {
            // greetingsにオブジェクトを追加して反映
            let user = this.$auth.state.user
            user.greetings = [
                {
                    content: '',
                    fst_hashtag: '',
                    hash_id: '',
                    media_url: '',
                    snd_hashtag: '',
                    trd_hashtag: ''
                }
            ]
            this.preGreetings = this.greetings // 変更前の値保持
            this.greetings.push(user)
            this.model = this.greetings.length - 1
            this.cardState = 'edit'
        },

        /**
         * 編集画面から戻って来るため
         */
        async returnEdit(editedContent) {
            await this.getGreetings()
            this.cardState = 'preview'
        },
        cancelEdit() {
            this.greetings = this.preGreetings
            const lastIndex = this.greetings[this.greetings.length - 1]
                .greetings[0]
            if (lastIndex.content === '' && lastIndex.hash_id === '') {
                this.greetings.pop()
            }
            this.cardState = 'preview'
            this.model = this.preModel
        },

        deleteGreeting() {
            const self = this
            this.$axios
                .$delete(
                    `${process.env.apiBaseUrl}greetings?hash_id=${this.greetings[this.model].greetings[0].hash_id}`
                )
                .then(async (_res) => {
                    if (_res.results === 200) {
                        await self.getGreetings()
                        self.model = 0
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
