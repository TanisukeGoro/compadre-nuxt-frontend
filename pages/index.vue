<template>
    <v-app>
        <v-content>
            <v-layout>
                <v-app-bar app clipped-left color="primary" height="50">
                    <v-btn color="white" text>
                        <p class="subtitle-1 mb-1">
                            Got to English site click here
                        </p>
                    </v-btn>
                    <v-btn
                        color="gray--text text--light-1"
                        text
                        href="https://greenlion62.sakura.ne.jp/LP/registar.php"
                    >
                        <p class="subtitle-1 mb-1">事前登録</p>
                    </v-btn>
                    <div class="flex-grow-1"></div>
                    <v-btn color="white" text to="/signup" nuxt>
                        <p class="subtitle-1 mb-1 mr-12">Signup</p>
                    </v-btn>
                    <v-btn color="white" text to="/login" nuxt>
                        <p class="subtitle-1 mb-1 mr-12">Login</p>
                    </v-btn>
                </v-app-bar>
                <v-carousel
                    :show-arrows="true"
                    hide-delimiter-background
                    :interval="5000"
                    show-arrows-on-hover
                    delimiter-icon="mdi-minus"
                    cycle
                >
                    <v-carousel-item
                        v-for="(slide, i) in slides"
                        :key="i"
                        :src="slide.img"
                    >
                        <v-card
                            :class="
                                `d-flex align-end justify-${slide.align} ma-12 px-12`
                            "
                            height="300"
                            color="#00000000"
                            outlined
                            tile
                        >
                            <div class="white--text">
                                <p class="display-2">{{ slide.title }}</p>
                                <div>
                                    <div
                                        v-for="(text,
                                        index) in slide.text.split('<br>')"
                                        :key="index"
                                        :class="`title text-${slide.textAlign}`"
                                    >
                                        {{ text }}
                                    </div>
                                    <div
                                        :class="`text-${slide.textAlign} pa-4`"
                                    >
                                        <v-btn
                                            color="primary"
                                            class="subtitle-1"
                                            height="40"
                                            to="/signup"
                                            >SIGNUP</v-btn
                                        >

                                        <v-btn
                                            color="primary"
                                            style="background-color:#fafafa"
                                            text
                                            width="100"
                                            class="subtitle-1"
                                            height="40"
                                            to="/login"
                                            nuxt
                                            >LOGIN</v-btn
                                        >
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </v-carousel-item>
                </v-carousel>
            </v-layout>
            <v-layout row wrap class="d-flex align-end justify-center">
                <v-card
                    max-width="1000"
                    color="background"
                    class="ma-12 px-12"
                    flat
                >
                    <h2
                        style="font-weight: bold; font-size: xx-large;color: #ACB6E5; background: -webkit-linear-gradient(0deg, #c21500, #ffc500);-webkit-background-clip: text; -webkit-text-fill-color: transparent;"
                    >
                        誰でも気軽に国際交流できる接点を生み出すアプリ
                    </h2>
                    <v-card-text class="title px-0"
                        >今までの交流手段は物理的な距離と時間の制約のせいで国際交流がしたくてもできない状況が続きました。本来、国際交流のあるべき姿はオンラインでのコミュニケーションにとどまらずオフラインでの交流も必要不可欠だと信じています。我々のサービスはお互いのパーソナルスペースを確保した中でオフライン・オンラインでの交流ができます。さぁ、自分の世界を広げてみましょう。</v-card-text
                    >
                </v-card>
            </v-layout>
            <v-layout row wrap class="d-flex align-end justify-center">
                <v-card
                    max-width="1000"
                    flat
                    color="background"
                    class="table--background"
                >
                    <v-carousel
                        cycle
                        :show-arrows="false"
                        hide-delimiter-background
                    >
                        <v-carousel-item>
                            <v-card width="1000" color="background" flat>
                                <v-simple-table light class="text-center">
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th
                                                    class="text-center title pa-4"
                                                >
                                                    <h2
                                                        style="font-weight: bold; color: #ACB6E5; background: -webkit-linear-gradient(0deg, #ACB6E5, #86FDE8);-webkit-background-clip: text; -webkit-text-fill-color: transparent;"
                                                    >
                                                        事前登録で今なら３ヶ月無料で使えます
                                                    </h2>
                                                    <h4>
                                                        いいね!数の制限を解除
                                                    </h4>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="subtitle-1">
                                                    1ヶ月プラン / 1980円
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1">
                                                    3ヶ月プラン / 4980円
                                                    <mark>(1040円お得)</mark>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1">
                                                    6ヶ月プラン / 9980円
                                                    <mark>(1900円お得)</mark>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1">
                                                    12ヶ月プラン / 21600円
                                                    <mark>(2600円お得)</mark>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card>
                        </v-carousel-item>
                        <v-carousel-item class="table--background">
                            <v-card
                                width="1000"
                                color="background"
                                class="table--background"
                                flat
                            >
                                <v-simple-table light class="text-center">
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th
                                                    class="text-center title pa-4"
                                                >
                                                    <h2
                                                        style="font-weight: bold; color: #ACB6E5; background: -webkit-linear-gradient(0deg, #ACB6E5, #86FDE8);-webkit-background-clip: text; -webkit-text-fill-color: transparent;"
                                                    >
                                                        FREE right now if you
                                                        Pre-registration
                                                    </h2>
                                                    <h4>Remove restriction</h4>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="subtitle-1">
                                                    1 Month / 1980yen
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1">
                                                    3 Month / 4980yen
                                                    <mark
                                                        >(1040yen cheaper)</mark
                                                    >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1">
                                                    6 Month / 9980yen
                                                    <mark
                                                        >(1900yen cheaper)</mark
                                                    >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1">
                                                    12 Month / 21600yen
                                                    <mark
                                                        >(2600yen cheaper)</mark
                                                    >
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card>
                        </v-carousel-item>
                    </v-carousel>
                    <v-divider color="grey" class="align-center"></v-divider>
                </v-card>
            </v-layout>

            <v-layout row wrap class="d-flex align-end justify-center">
                <v-card max-width="1000" color="background" flat>
                    <section class="py-12">
                        <v-container>
                            <v-row align="center">
                                <v-col lg="7" class="bg-symbol-2">
                                    <h4
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="overline mb-4"
                                    >
                                        Why Me
                                    </h4>
                                    <h5
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="display-2"
                                    >
                                        Compadreができた理由
                                    </h5>
                                    <p
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="title font-weight-regular py-5 pr-10"
                                    >
                                        世界は未だに勘違いされています。外国に行こうとしても危険だからという理由で行かせてもらえない。外の世界は危ないから外に出ては行けない。
                                        まだみたことのない世界に人々は恐怖を抱いているだけで実際は恐れる必要はなく世界の人々は優しいです。
                                        カナダで出会った同性愛の英語の先生、23歳と26歳の兄弟で中国から勉強に来た学生、起業家に憧れてビジネスを学びに来たブラジル人、サッカーをこよなく愛するメキシコ人、バイリンガルの優秀なアメリカ人。全ての人々が英語の話せない私に優しくしてくれました。
                                        過去の私のようにまだまだ世界を勘違いしている人々はたくさんいます。我々はその勘違いを無くし、私たちの住む世界は愛で包まれていることを示したいのです。
                                    </p>
                                    <v-btn
                                        v-scroll-reveal.reset="
                                            revealFromBottomAt400
                                        "
                                        rounded
                                        height="auto"
                                        color="primary"
                                        class="px-10 py-4"
                                        depressed
                                        to="/signup"
                                    >
                                        <v-icon left
                                            >mdi-hand-pointing-right</v-icon
                                        >Signup
                                    </v-btn>
                                </v-col>
                                <v-col lg="5">
                                    <div
                                        v-scroll-reveal.reset="
                                            revealPointedImg1
                                        "
                                        class="pointed-img-wrap mb-12 mb-md-0"
                                    >
                                        <v-img
                                            src="https://hotjapanse.com/LP/images/why.png"
                                            class="pointed-img left"
                                        ></v-img>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </section>

                    <v-divider color="grey" class="align-center"></v-divider>

                    <section class="py-12">
                        <v-container>
                            <v-row align="center">
                                <v-col lg="5">
                                    <div
                                        v-scroll-reveal.reset="
                                            revealPointedImg1
                                        "
                                        class="mb-12 mb-md-0"
                                    >
                                        <v-img
                                            src="https://hotjapanse.com/LP/images/top.png"
                                        ></v-img>
                                    </div>
                                </v-col>
                                <v-col lg="7" class="pl-12">
                                    <h4
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="overline mb-4"
                                    >
                                        Concept
                                    </h4>
                                    <h5
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="display-2"
                                    >
                                        共通の話題から始める会話
                                    </h5>
                                    <p
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="title font-weight-regular py-5 pr-10"
                                    >
                                        「さぁ、異国の人と会話しよう！」と思っても何から話せばいいのか？でも好きなことについてなら言語の壁さえ超えて想いを伝えられる。興味のある話題を記入して始めよう。興味のある話題には興味あるボタンを押して相手とマッチングするとチャットが開始。何も難しくありません。これだけです。
                                    </p>
                                    <v-btn
                                        v-scroll-reveal.reset="
                                            revealFromBottomAt400
                                        "
                                        rounded
                                        height="auto"
                                        color="primary"
                                        class="px-10 py-4"
                                        depressed
                                        to="/signup"
                                    >
                                        <v-icon left
                                            >mdi-hand-pointing-right</v-icon
                                        >Signup
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </section>

                    <v-divider color="grey" class="align-center"></v-divider>

                    <section class="py-12">
                        <v-container>
                            <v-row align="center">
                                <v-col lg="7" class="bg-symbol-2">
                                    <h4
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="overline mb-4"
                                    >
                                        Why Me
                                    </h4>
                                    <h5
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="display-2"
                                    >
                                        チャットが始まると
                                    </h5>
                                    <p
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="title font-weight-regular py-5 pr-10"
                                    >
                                        共通の話題で盛り上がると我々からマッチング相手と最適なオフラインで会える場所を提案します。カフェなどに止まらずアクティビティなども選択できます。自分の好きなジャンルを選んで提案してみましょう！
                                    </p>
                                    <v-btn
                                        v-scroll-reveal.reset="
                                            revealFromBottomAt400
                                        "
                                        rounded
                                        height="auto"
                                        color="primary"
                                        class="px-10 py-4"
                                        depressed
                                        to="/signup"
                                    >
                                        <v-icon left
                                            >mdi-hand-pointing-right</v-icon
                                        >Signup
                                    </v-btn>
                                </v-col>
                                <v-col lg="5">
                                    <div
                                        v-scroll-reveal.reset="
                                            revealPointedImg1
                                        "
                                        class="pointed-img-wrap mb-12 mb-md-0"
                                    >
                                        <v-img
                                            src="https://hotjapanse.com/LP/images/chat.png"
                                            class="pointed-img left"
                                        ></v-img>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </section>

                    <v-divider color="grey" class="align-center"></v-divider>

                    <section class="py-12">
                        <v-container>
                            <v-row align="center">
                                <v-col lg="5">
                                    <div
                                        v-scroll-reveal.reset="
                                            revealPointedImg1
                                        "
                                        class="mb-12 mb-md-0"
                                    >
                                        <v-img
                                            src="https://hotjapanse.com/LP/images/time.png"
                                        ></v-img>
                                    </div>
                                </v-col>
                                <v-col lg="7" class="pl-12">
                                    <h4
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="overline mb-4"
                                    >
                                        Concept
                                    </h4>
                                    <h5
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="display-2"
                                    >
                                        テキストの必要はなし！
                                    </h5>
                                    <p
                                        v-scroll-reveal.reset="revealFromBottom"
                                        class="title font-weight-regular py-5 pr-10"
                                    >
                                        日程調整もチャット内で面倒な入力を省いています。実際に会ってみて好きなことについて語り尽くそう。そうすると自分の世界は広がり、親しい仲の人がまた１人増えました。
                                    </p>
                                    <v-btn
                                        v-scroll-reveal.reset="
                                            revealFromBottomAt400
                                        "
                                        rounded
                                        height="auto"
                                        color="primary"
                                        class="px-10 py-4"
                                        depressed
                                        to="/signup"
                                    >
                                        <v-icon left
                                            >mdi-hand-pointing-right</v-icon
                                        >Signup
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </section>
                </v-card>
            </v-layout>
        </v-content>
        <v-footer height="auto" color="primary" dark>
            <v-layout justify-center row wrap>
                <p>&copy; 2019 compadre, Inc. &middot;</p>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    layout: 'empty',
    auth: false,
    data() {
        return {
            revealFromBottom: {
                origin: 'bottom',
                distance: '100%'
            },
            revealFromBottomAt400: {
                origin: 'bottom',
                distance: '100%',
                delay: 400
            },
            revealFromRight: {
                distance: '100%',
                origin: 'right'
            },
            revealPointedImg1: {
                distance: '30%',
                origin: 'left'
            },
            revealPointedImg2: {
                distance: '30%',
                origin: 'right'
            },
            cycle: false,
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237
                },
                {
                    name: 'Eclair',
                    calories: 262
                },
                {
                    name: 'Cupcake',
                    calories: 305
                },
                {
                    name: 'Gingerbread',
                    calories: 356
                },
                {
                    name: 'Jelly bean',
                    calories: 375
                },
                {
                    name: 'Lollipop',
                    calories: 392
                },
                {
                    name: 'Honeycomb',
                    calories: 408
                },
                {
                    name: 'Donut',
                    calories: 452
                },
                {
                    name: 'KitKat',
                    calories: 518
                }
            ],
            slides: [
                {
                    name: 'us',
                    img: 'https://hotjapanse.com/LP/images/us.jpg',
                    title: 'Broaden your world.',
                    text:
                        'OPEN MIND.LOOK AT THIS WORLD.<br>YOU DON’T KNOW YET.<br>THIS WORLD HAS GOOD PEOPLE',
                    align: 'start',
                    textAlign: 'left'
                },
                {
                    name: 'thai',
                    img: 'https://hotjapanse.com/LP/images/thai.jpg',
                    title: 'ขยายโลกของฉัน',
                    text: 'เปิดใจดูที่โลกนี้คุณไม่เคยรู้ว่าโลกนี้มีคนดี',
                    align: 'center',
                    textAlign: 'center'
                },
                {
                    name: 'tokyo',
                    img: 'https://hotjapanse.com/LP/images/tokyo.jpg',
                    title: '自分の世界を広げよう',
                    text:
                        'まだ私たちはこの世界の素晴らしさに気づいてません。<br>固定概念を捨てて新しい自分に出会おう<br>世界はもっと美しいものになります',
                    align: 'end',
                    textAlign: 'right'
                },
                {
                    name: 'uk',
                    img: 'https://hotjapanse.com/LP/images/uk.jpg',
                    title: 'Broaden your world.',
                    text:
                        'OPEN MIND.LOOK AT THIS WORLD.<br>YOU DON’T KNOW YET.<br>THIS WORLD HAS GOOD PEOPLE',
                    align: 'start',
                    textAlign: 'left'
                },
                {
                    name: 'china',
                    img: 'https://hotjapanse.com/LP/images/china.jpg',
                    title: '拓宽我的世界。',
                    text:
                        '在這個世界上敞開心OK。<br>你還不知道。<br>這個世界人很好',
                    align: 'center',
                    textAlign: 'center'
                },
                {
                    name: 'korea',
                    img: 'https://hotjapanse.com/LP/images/korea.jpg',
                    title: '내 세상을 넓히십시오.',
                    text:
                        '이 세상에서 열린 마음을 가지십시오.<br>당신은 아직 몰라요.<br>이 세상에는 좋은 사람들이있었습니다',
                    align: 'end',
                    textAlign: 'right'
                }
            ]
        }
    },
    methods: {
        revealFromRightWithDelay(delay) {
            return {
                distance: '100%',
                origin: 'right',
                delay
            }
        },
        revealFromTopWithDelay(delay) {
            return {
                distance: '50%',
                origin: 'top',
                delay
            }
        }
    }
}
</script>

<style>
.v-data-table {
    background-color: #fafafa !important;
}
mark {
    background-color: #fcf8e3;
    color: black;
}
</style>
