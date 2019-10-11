<template>
    <v-content v-if="No_one_likes_me">
        <v-container class="mt-0">
            <v-card
                v-for="(item, index) in attentionMeData"
                :key="index"
                :to="`/app/attention/${item.id}`"
                class="mx-auto mt-2"
                max-width="344"
                outlined
                nuxt
            >
                <v-list-item three-line>
                    <v-list-item-avatar size="70" color="grey">
                        <v-img :src="item.icon_url" aspect-ratio="1.7"></v-img
                    ></v-list-item-avatar>

                    <div>
                        <v-list-item-title class="headline">{{
                            item.name
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                            job_conversion(item.job_type)
                        }}</v-list-item-subtitle>
                        <v-list-item-subtitle>{{
                            item.fst_lang | langCode2langName
                        }}</v-list-item-subtitle>
                    </div>
                </v-list-item>
            </v-card>
        </v-container>
    </v-content>
    <v-content v-else><NoLikesme /></v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { countries } from '~/plugins/phoneCodeCountries'
import NoLikesme from '~/components/NoLikesme'
export default {
    components: {
        NoLikesme
    },
    data() {
        return {
            countries,
            items: '',
            attentionMeData: '',
            jobCode: {
                1: '事務・オフィス系',
                2: '販売・飲食・サービス系',
                3: 'IT・エンジニア系',
                4: 'Web・クリエイター系',
                5: '医療・介護・福祉系',
                6: '研究機関・教育系',
                7: '商社・金融・経営',
                8: '学生'
            },
            No_one_likes_me: true
        }
    },
    async mounted() {
        await this.GetAttentionMe()
        this.attentionMeData = this.$store.getters['app/attention_me/data']
        if (this.attentionMeData.length === 0) {
            this.No_one_likes_me = false
        }
        console.log(this.attentionMeData.length)
    },
    methods: {
        ...mapActions('app/attention_me', ['GetAttentionMe']),
        ...mapState('app/attention_me', ['data']),
        job_conversion(job) {
            return this.jobCode[job]
        },
        Userdata(data) {
            this.$router.push('../pages/app/attention-me/_attentionId=' + data)
        }
    }
}
</script>

<style></style>
