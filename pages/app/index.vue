<template>
    <v-content class="pt-0 pb-0 selectcard">
        <v-card max-width="480">
            <v-row>
                <v-col :cols="4" class="pr-0">
                    <v-container fluid>
                        <v-img
                            class="elevation-6 profileimg"
                            max-width="100px"
                            src="https://scontent.ffuk4-1.fna.fbcdn.net/v/t1.0-1/p320x320/10393771_1392453211044724_430063713553090743_n.jpg?_nc_cat=106&_nc_oc=AQkSqb-ptorYtsY7QVWQ6obDOkta6OQu_k1Du-vlqemEf_S4rFjmLMLrDKhXdGkqppIdccddclPKkMCQRkOLUUEB&_nc_ht=scontent.ffuk4-1.fna&oh=b3454915b977e13c6c43eee5e8005f6c&oe=5E0806D2"
                        ></v-img>
                    </v-container>
                </v-col>
                <v-col>
                    <v-container fluid class="pl-0">
                        <v-list class="pb-0 pt-0 headline">吉田大樹</v-list>
                        <v-list class="pb-0 pt-0">Tokyo</v-list>
                        <v-row>
                            <v-col class="pb-0 pt-0 pr-0" cols="3">24歳</v-col>
                            <v-col class="pb-0 pt-0 pr-0 pl-0"
                                >エンジニアリング</v-col
                            >
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row>
                <!-- <v-card-text class="font-weight-bold pb-0 pt-0 select-text"> -->
                <v-card-text class="pb-0 pt-0 select-text">
                    草しばらく、立ってお祈いのだ。こっちを見ているかもとれなようするといわになるほど激はげしく列れつは。
                    春はあけぼのやうやう白く成りゆく山際少しあかりて白くたなびきたる
                </v-card-text>
            </v-row>
            <v-row style="margin-bottom:50px">
                <v-col cols="1">
                    <v-icon>mdi-access-point</v-icon>
                </v-col>
                <v-col>英語</v-col>
                <v-col>日本語</v-col>
                <v-col>イングリ</v-col>
            </v-row>
            <LButton />
        </v-card>
        <NButton />
    </v-content>
</template>
<script>
import '@/assets/selectcard.css'
import LButton from '~/components/LikeButton'
import NButton from '~/components/NextButton'
// import { firebase, db } from '~/plugins/firebase'
export default {
    components: {
        // SelectCard
        LButton,
        NButton
    },
    asyncData({ redirect }) {
        redirect(200, '/app/select')
    },
    methods: {
        async logout() {
            try {
                const response = await this.$auth.logout()
                return response
            } catch (error) {}
        }
    }
}
</script>
