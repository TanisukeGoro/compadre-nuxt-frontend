<template>
    <component
        :is="componentState"
        v-model="model"
        :carousel-count="model"
        :candidates="userdata"
        :hide-delimiters="hideDelimiters"
        :show-arrows="showArrows"
        :touchless="touchLess"
        :card-state="cardState"
    />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GreetingCard from '~/components/GreetingCard'
import { countries } from '~/plugins/phoneCodeCountries'
export default {
    components: {
        // SelectCard
        Default: GreetingCard,
        GreetingCard
    },
    data() {
        return {
            ID: '',
            countries,
            userdata: [
                {
                    /**
                     * データのベタ書きだとちゃんと入るが、この形に整形できなかった。。
                     */
                    // birthday: '1992-10-21',
                    // country: 'DJ',
                    // current_greet_hash: null,
                    // fasebook: 'https://www.facebook.com/keishi.abe.5',
                    // favorite_id: 10010011,
                    // fst_lang: 'ml',
                    // greetings: [
                    //     {
                    //         content:
                    //             'いしょに行こうの青や橙だいや、もとめたいとジョバンニは、もうだんだかそのきれぎれの考えのように崖が。',
                    //         created_at: '2019-10-04 14:47:00',
                    //         fst_hashtag: 'in',
                    //         hash_id:
                    //             '$2y$10$ZxfQXJhEuQKE6Zs4abTr4uj1tQb8zxM4j8L0Ezhl4zH/BOsO8JNy2',
                    //         id: 36,
                    //         media_url: 'https://lorempixel.com/640/480/?86872',
                    //         snd_hashtag: 'tempore',
                    //         trd_hashtag: 'itaque',
                    //         updated_at: '2019-10-04 14:47:00',
                    //         user_id: 52
                    //     }
                    // ],
                    // has_user_voted: false,
                    // icon_url: 'https://lorempixel.com/640/480/?18235',
                    // id: 8,
                    // instagram: 'https://www.instagram.com/aared_3/',
                    // job_type: 7,
                    // name: '青山 治',
                    // profile_text:
                    //     'Numquam eius sapiente aut officia aut eos tempore. Iste quis eos qui quidem.',
                    // sex: 1,
                    // snd_lang: 'te',
                    // trd_lang: 'bi',
                    // twitter: 'https://twitter.com/okita_kamegoro'
                }
            ],
            GreetingCard,
            model: 0,
            cardState: 'select',
            showArrows: true,
            componentState: 'Default',
            // greetings: [],
            touchLess: false,
            hideDelimiters: true
        }
    },
    async mounted() {
        this.ID = this.$route.params.id
        await this.GetUserInfo(this.ID)
        this.userdata.push(this.$store.getters['app/attentionuser/data'])
        console.log('userdata', this.userdata)
    },
    methods: {
        ...mapActions('app/attentionuser', ['GetUserInfo']),
        ...mapState('app/attentionuser', ['data'])
    }
}
</script>
