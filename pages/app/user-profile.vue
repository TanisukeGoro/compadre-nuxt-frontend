<template>
    <v-flex style="margin:0 auto;background-color:white;position:relative;">
        <!-- 背景写真の範囲 -->
        <v-flex xs12 sm12>
            <v-img
                max-width="600px"
                src="https://picsum.photos/id/11/500/300"
            ></v-img>
            <div class="user-img-space" style="position:relative;">
                <img
                    src="https://picsum.photos/id/11/500/300"
                    class="user-main-img"
                />
                <v-card-text font-weight-bold class="user-name">
                    <v-list-item-title class="headline mb-1">{{
                        name
                    }}</v-list-item-title>
                </v-card-text>
            </div>
        </v-flex>
        <!-- 変更名前ユーザー写真の範囲 -->

        <v-layout justify-center style="text-align:center;">
            <v-flex xs6>
                <v-btn text color="primary">フレンド</v-btn>
            </v-flex>
            <v-flex xs6>
                <v-btn outlined color="#22A9E4" rounded>変更</v-btn>
            </v-flex>
        </v-layout>

        <!-- ユーザー情報カード-->
        <v-card
            class="mx-auto mt-9 ml-0 mr-0 overline"
            max-width="600"
            flat
            style="border-bottom:1px solid rgba(0,0,0,0.2);border-top:1px solid rgba(0,0,0,0.2);"
        >
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="mb-1">
                        <v-icon>mdi-account-card-details-outline</v-icon>
                        {{ job }}
                    </v-list-item-title>
                    <v-list-item-title class="mb-1">
                        <v-icon>mdi-home-outline</v-icon>
                        {{ presentLocation }}
                    </v-list-item-title>
                    <v-list-item-title class="mb-1">
                        <v-icon>mdi-voice</v-icon>
                        {{ langage }}
                    </v-list-item-title>
                    <v-list-item-title class="mb-1">
                        <v-icon>mdi-account-star-outline</v-icon>
                        {{ age }}歳
                    </v-list-item-title>
                    <v-list-item-title class="mb-1">
                        <v-icon>mdi-airballoon</v-icon>
                        {{ from }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <!-- ユーザーのgreeting -->
        <div class="user-text pt-5 pr-4 pl-4 title">
            草しばらく、立ってお祈いのだ。こっちを見ているかもとれなようするといわになるほど激はげしく列れつは。
            春はあけぼのやうやう白く成りゆく山際少しあかりて白くたなびきたる
        </div>
        <div class="text-center">
            <v-pagination
                v-model="page"
                :length="greetinglength"
                circle
            ></v-pagination>
        </div>
        <div class="greeting-toEdit">
            <v-icon>mdi-file-document-edit-outline</v-icon>
        </div>
        <BottomNav />
    </v-flex>
</template>

<script>
import '@/assets/user-profile.css'
import BottomNav from '~/components/BottomNav'
export default {
    layout: 'empty',
    components: {
        BottomNav
    },
    data() {
        return {
            name: '吉田大樹',
            job: 'エンジニア',
            presentLocation: '東京渋谷',
            langage: '日本語',
            age: '24',
            from: 'カナダ',
            page: 1,
            greetinglength: 3
        }
    }
}
</script>
