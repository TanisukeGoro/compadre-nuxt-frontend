<template>
    <v-carousel hide-delimiters show-arrows-on-hover :show-arrows="showArrow">
        <v-carousel-item v-for="(showCard, i) in showCards" :key="i">
            <v-sheet :color="'#fafafa'" tile>
                <v-row align="center" justify="center">
                    <v-card
                        :loading="loading"
                        class="mx-auto"
                        max-width="100%"
                        light
                    >
                        <v-img
                            height="200"
                            :src="
                                showCard.mediaUrl
                                    ? showCard.mediaUrl
                                    : 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
                            "
                            :lazy-src="
                                'https://cdn.vuetifyjs.com/images/cards/cooking.png'
                            "
                        >
                            <template v-slot:placeholder>
                                <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                >
                                    <v-progress-circular
                                        indeterminate
                                        color="grey lighten-5"
                                    ></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>

                        <v-card-title style="font-weight: bold;">{{
                            showCard.name
                        }}</v-card-title>
                        <v-card-text>
                            <div class="my-4 body-2">
                                住所:{{ showCard.address }}
                            </div>

                            <div>
                                <a :href="showCard.mapLink">
                                    <v-icon>mdi-google-maps</v-icon>
                                    {{ showCard.name }}をGoogleマップで開く
                                </a>
                            </div>
                        </v-card-text>
                        <v-card-actions style="justify-content: center;">
                            <div class="text-center">
                                <v-btn
                                    v-show="showSendBtn"
                                    rounded
                                    dark
                                    style="background: linear-gradient(to right, #70e1f5, #ffd194);"
                                    @click="sendActivityCard(showCard)"
                                    >SEND</v-btn
                                >
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-row>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>
<script>
import { db, firebase } from '~/plugins/firebase'

export default {
    props: {
        cardType: {
            type: String,
            default: ''
        },
        postId: {
            type: String,
            default: ''
        },
        toTalkUser: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            colors: ['#fafafa', '#fafafa', '#fafafa', '#fafafa', '#fafafa'],
            loading: false,
            showCards: {},
            showArrow: true,
            showSendBtn: true,
            activityDB: {
                shopping: [
                    {
                        name: 'ヴィーナスフォート/Venus Fort',
                        postalCode: '135-0064',
                        mediaUrl:
                            'https://media-cdn.tripadvisor.com/media/photo-s/15/c0/25/0e/caption.jpg',
                        address: ' 東京都江東区青海１丁目３−１５',
                        mapLink: 'https://goo.gl/maps/89aeefcpGczqXceU6',
                        area: '上'
                    },
                    {
                        name: '東京ソラマチ/Tokyo Solamachi',
                        postalCode: '131-0045',
                        mediaUrl:
                            'http://www.tokyo-solamachi.jp/information/img/img-information-top-01.png',
                        address: '東京都墨田区押上１丁目１−２',
                        mapLink: 'https://goo.gl/maps/RxTcyWvVkTc9SvqZA',
                        area: '上'
                    },
                    {
                        name: '東京ミッドタウン/Tokyo Midtown',
                        postalCode: '107-0052',
                        mediaUrl:
                            'https://i.ytimg.com/vi/eUnw0CEKaCs/maxresdefault.jpg',
                        address: '東京都港区赤坂９丁目７−１',
                        mapLink: 'https://goo.gl/maps/kitu9jZazJPAvPDQ8',
                        area: '下'
                    },
                    {
                        name: '有楽町イトシア/Yurakucho Itosia',
                        postalCode: '100-0006',
                        mediaUrl:
                            'https://www.toda.co.jp/works/com/images/com_10.jpg',
                        address: '東京都千代田区有楽町２丁目７−１',
                        mapLink: 'https://goo.gl/maps/XwyStns5Ynybm2Pv5',
                        area: '下'
                    },
                    {
                        name:
                            '渋谷原宿キャットストリート/Shibuya Harajuku Cat Street',
                        postalCode: '150-0001',
                        mediaUrl:
                            'https://img.hldy-cdn.com/images/holiday_article_images/w=660/6731.jpg?1543293660',
                        address: ' 東京都渋谷区神宮前５丁目１０−１０',
                        mapLink: 'https://goo.gl/maps/2Zwqmo5tkaaPzawD9',
                        area: '右'
                    },
                    {
                        name: 'コレド室町/Coredo Muromachi',
                        postalCode: '103-0022',
                        mediaUrl:
                            'https://niconico25.com/wp-content/uploads/2019/09/coledo1-e1567906823577.jpg',
                        address: ' 東京都中央区日本橋室町２丁目２−１',
                        mapLink: 'https://goo.gl/maps/chHCin9MDUQKb1yh8',
                        area: '右'
                    },
                    {
                        name: 'ルミネ新宿/LUMINE Shinjuku',
                        postalCode: '160-0022',
                        mediaUrl:
                            'https://resources.matcha-jp.com/old_thumbnails/720x2000/2494.jpg',
                        address: '東京都新宿区新宿３丁目３８−２',
                        mapLink: 'https://goo.gl/maps/QyNuMHDXq6HBquYbA',
                        area: '左'
                    },
                    {
                        name: 'NEWoMan',
                        postalCode: '160-0022',
                        address: ' 東京都新宿区新宿４丁目１−６',
                        mediaUrl:
                            'https://i1.wp.com/tokyolucci.jp/wp-content/uploads/2016/04/DSC06508.jpg?resize=675%2C450',
                        mapLink: 'https://goo.gl/maps/9LCXE4JtdyHfoXCC9',
                        area: '左'
                    }
                ],
                bar: [
                    {
                        name: 'HUB池袋西口店',
                        postalCode: '171-0021',
                        address: '東京都豊島区西池袋１丁目３３−４ 岩田ビル B1F',
                        mediaUrl:
                            'https://www.pub-hub.com//uploads/top/image/251557735701.jpg',
                        mapLink: 'https://goo.gl/maps/RR4K1MjpcMW1vGDE7',
                        area: '上'
                    },
                    {
                        name: 'バースピークイージー',
                        postalCode: '170-0004',
                        address: '東京都豊島区北大塚２丁目１４−１',
                        mediaUrl:
                            'https://media-cdn.tripadvisor.com/media/photo-s/0e/44/5b/60/international-party-speak.jpg',
                        mapLink: 'https://goo.gl/maps/b4qknqzubt7rL9kU8',
                        area: '上'
                    },
                    {
                        name: '82 Ale House 五反田西口店',
                        postalCode: '141-0031',
                        address:
                            '東京都品川区西五反田１丁目２６−３ 五反田 第 2 白井 ビル 1F',
                        mediaUrl:
                            'https://www.pub-hub.com//uploads/top/image/251557735701.jpg',
                        mapLink: 'https://goo.gl/maps/ZcjVjAjK8qL6z2s5A',
                        area: '下'
                    },
                    {
                        name: '銀座ライオン 銀座五丁目店',
                        postalCode: '104-0061',
                        address: '東京都中央区銀座５丁目８−１ GINZA PLACE B2',
                        mediaUrl:
                            'https://i1.wp.com/tokyolucci.jp/wp-content/uploads/2016/04/DSC06508.jpg?resize=675%2C450',
                        mapLink: 'https://g.page/GINZALIONGINZA5?share',
                        area: '下'
                    },
                    {
                        name: 'HUBロッテシティホテル錦糸町店',
                        postalCode: '130-0013',
                        address: '東京都墨田区錦糸４丁目６−１',
                        mediaUrl:
                            'https://www.pub-hub.com//uploads/top/image/251557735701.jpg',
                        mapLink: 'https://goo.gl/maps/Nmw2rXfRDBT56PWT7',
                        area: '右'
                    },
                    {
                        name: 'HUB秋葉原店',
                        postalCode: '101-0022',
                        address:
                            '東京都千代田区神田練塀町 千代田区神田練塀町３ 富士ソフト秋葉原ビル 1F',
                        mediaUrl:
                            'https://www.pub-hub.com//uploads/top/image/251557735701.jpg',
                        mapLink: 'https://goo.gl/maps/GV7BL63bvuepRrep8',
                        area: '右'
                    },
                    {
                        name: 'HUB中野南口店',
                        postalCode: '164-0001',
                        address: '東京都中野区中野２丁目３０−３ マルニビル B1F',
                        mediaUrl:
                            'https://www.pub-hub.com//uploads/top/image/251557735701.jpg',
                        mapLink: 'https://goo.gl/maps/LPJpJsXXS8UtZBYP8',
                        area: '左'
                    },
                    {
                        name: 'BAGUS -バグース- 新宿西口店',
                        postalCode: '160-0023',
                        address:
                            '東京都新宿区西新宿１丁目３−３ 品川ステーションビル 新宿 2F',
                        mediaUrl:
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvEfNr-fsntJ-WxPW-SLlsiRp-HgLuChaHWk0SD1lB3z_OQp-O',
                        mapLink: 'https://goo.gl/maps/fTRpq4pzmQtwLj2p8',
                        area: '左'
                    }
                ],
                activities: [
                    {
                        name: 'ラウンドワンスタジアム板橋店',
                        postalCode: '174-0044',
                        address: '東京都板橋区相生町16番13号',
                        mediaUrl:
                            'http://www.at-s.com/facilities/images/n14/138033/138034_roundone_thumb.jpg',
                        mapLink: 'https://goo.gl/maps/61HJ6b3pi3W1LxS28',
                        area: '上'
                    },
                    {
                        name: 'ラウンドワン池袋店',
                        postalCode: '170-0013',
                        mediaUrl:
                            'http://www.at-s.com/facilities/images/n14/138033/138034_roundone_thumb.jpg',
                        address: '東京都豊島区東池袋一丁目14番1号 池袋スクエア',
                        mapLink: 'https://goo.gl/maps/LUUJ3rzUtPABVFbj7',
                        area: '上'
                    },
                    {
                        name:
                            'ラウンドワンスタジアムダイバーシティ東京プラザ店',
                        postalCode: '135-0064',
                        address:
                            '東京都江東区青海(あおみ)1丁目1番10号 ダイバーシティ東京 プラザ 6階',
                        mediaUrl:
                            'http://www.at-s.com/facilities/images/n14/138033/138034_roundone_thumb.jpg',
                        mapLink: 'https://goo.gl/maps/AoBTgtydBz8jy5dZ9',
                        area: '下'
                    },
                    {
                        name: '東京ジョイポリス/Tokyo Joypolis',
                        postalCode: '135-0091',
                        address:
                            '東京都港区台場１丁目６−１ 3F～5F DECKS Tokyo Beach',
                        mediaUrl:
                            'https://img.hldy-cdn.com/images/holiday_article_images/w=660,h=371,c=true/6431.jpg?1554962240',
                        mapLink: 'https://goo.gl/maps/4xKhxgb82V8C4hMFA',
                        area: '下'
                    },
                    {
                        name: '台場一丁目商店街',
                        postalCode: '135-0091',
                        address:
                            '東京都港区台場１丁目６−１ デックス東京ビーチ シーサイドライン 4F',
                        mediaUrl:
                            'https://www.odaiba-decks.com/news/event/images/daiba1_chome_img.png',
                        mapLink: 'https://goo.gl/maps/gLWRmrNsoHd9cMtE9',
                        area: '右'
                    },
                    {
                        name: 'メガウェブ',
                        postalCode: '135-0064',
                        address: '東京都江東区青海１丁目３−１２',
                        mediaUrl:
                            'https://www.megaweb.gr.jp/images/area/csc/img_csc_grzone.jpg',
                        mapLink: 'https://goo.gl/maps/y1kkLdpBH4zTJhTn7',
                        area: '右'
                    },
                    {
                        name: 'ラウンドワン町田店',
                        postalCode: '194-0022',
                        address: '東京都町田市森野１丁目１３−１４',
                        mediaUrl:
                            'http://www.at-s.com/facilities/images/n14/138033/138034_roundone_thumb.jpg',
                        mapLink: 'https://goo.gl/maps/AzWSY6wcerUzwcT66',
                        area: '左'
                    }
                ],
                cafe: [
                    {
                        name:
                            'スターバックスコーヒー 池袋明治通り店/Starbucks Coffee',
                        postalCode: '171-0022',
                        address:
                            '東京都豊島区南池袋１丁目１８ 豊島区南池袋1-18-17 Ｉ＆Ｋビル1F',
                        mediaUrl:
                            'https://image.parco.jp/SCCWEB/image/urawa/store/storage/w320xh240/shop_logo_1f_starbucks2.jpg',
                        mapLink: 'https://goo.gl/maps/Sokj1fdmj8bn8Nre8',
                        area: '上'
                    },
                    {
                        name: 'ドトールコーヒーショップ 西日暮里店',
                        postalCode: '116-0013',
                        address: '東京都荒川区西日暮里５丁目１４−１ 太陽ビル',
                        mediaUrl:
                            'https://www.doutor.co.jp/common/images/topimg_dcs.jpg',
                        mapLink: 'https://goo.gl/maps/4oPWndo4G4V2KQB88',
                        area: '上'
                    },
                    {
                        name: '上島珈琲店 麻布十番店',
                        postalCode: '106-0045',
                        address:
                            '東京都港区麻布十番２丁目１−８ グランドメゾン1F',
                        mapLink:
                            'http://www.ueshima-coffee-ten.jp/img/common/logo_ogp.png',
                        area: '下'
                    },
                    {
                        name:
                            'スターバックスコーヒー 品川インターシティ店/Starbucks Coffee',
                        postalCode: '108-0075',
                        address:
                            '東京都港区港南２丁目１５−２ 品川インターシティ2F',
                        mediaUrl:
                            'https://image.parco.jp/SCCWEB/image/urawa/store/storage/w320xh240/shop_logo_1f_starbucks2.jpg',
                        mapLink: 'https://goo.gl/maps/atEyGfGWqYfmhcY98',
                        area: '下'
                    },
                    {
                        name: 'エクセルシオールカフェ アルカキット錦糸町店',
                        postalCode: '130-0013',
                        address:
                            '東京都墨田区錦糸２丁目２−１ アルカキット錦糸町',
                        mediaUrl:
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5j9J0odqIxo9X05wcNR6q1iGv0zqMV2wtbSMNrAfxeHoEZviMpQ',
                        mapLink: 'https://goo.gl/maps/ohmZScqFYTMHcgCq7',
                        area: '右'
                    },
                    {
                        name: 'ドトールコーヒー 新小岩ルミエール店',
                        postalCode: '124-0024',
                        address: '東京都葛飾区新小岩１丁目４９−２',
                        mediaUrl:
                            'https://www.doutor.co.jp/common/images/topimg_dcs.jpg',
                        mapLink: 'https://goo.gl/maps/du9YVk6Snec7NWSF8',
                        area: '右'
                    },
                    {
                        name: 'タリーズコーヒー 代々木駅北口店',
                        postalCode: '151-0053',
                        address: '東京都渋谷区代々木１丁目３６−１ オダカビル',
                        mediaUrl:
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEsUJPQ1d99BoYjNZ7cp-ttJcMUjpbyHIUrRzT4bO4IPo33DmI',
                        mapLink: 'https://goo.gl/maps/gfYBwcXJciDkH6ebA',
                        area: '左'
                    },
                    {
                        name: 'タリーズコーヒー 阿佐ヶ谷ダイヤ街店',
                        postalCode: '166-0004',
                        address:
                            '東京都杉並区阿佐谷南３丁目５５−１ 阿佐ヶ谷ダイヤ街 2F',
                        mediaUrl:
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEsUJPQ1d99BoYjNZ7cp-ttJcMUjpbyHIUrRzT4bO4IPo33DmI',
                        mapLink: 'https://goo.gl/maps/hjmBPuM3KnJSrbSCA',
                        area: '左'
                    }
                ],
                lunch_dinner: [
                    {
                        name: 'ジョナサン 池袋駅南口店',
                        postalCode: '171-0022',
                        address:
                            '東京都豊島区南池袋１丁目１６−１８ ｆａｃｅ池袋３Ｆ',
                        mediaUrl:
                            'https://www.skylark.co.jp/site_resource/jonathan/images/img_ogp.png',
                        mapLink:
                            'https://www.google.com/maps/place/%E3%82%B8%E3%83%A7%E3%83%8A%E3%82%B5%E3%83%B3+%E6%B1%A0%E8%A2%8B%E9%A7%85%E5%8D%97%E5%8F%A3%E5%BA%97/@35.739717,139.7117609,14.26z/data=!4m8!1m2!2m1!1z44K444On44OK44K144Oz!3m4!1s0x0:0xfe46e240596bed26!8m2!3d35.7265998!4d139.7113806',
                        area: '上'
                    },
                    {
                        name: 'ガスト 東十条店',
                        postalCode: '114-0001',
                        address: '東京都北区東十条５丁目７−２',
                        mediaUrl:
                            'https://www.skylark.co.jp/site_resource/gusto/images/img_ogp.png',
                        mapLink:
                            'https://www.google.com/maps/place/%E3%82%AC%E3%82%B9%E3%83%88+%E6%9D%B1%E5%8D%81%E6%9D%A1%E5%BA%97/@35.7768041,139.7195073,15z/data=!4m8!1m2!2m1!1z44Ks44K544OI!3m4!1s0x0:0x580a21d24ddc7c1e!8m2!3d35.7685243!4d139.7272968',
                        area: '上'
                    },
                    {
                        name: '大戸屋ごはん処 五反田東口駅前店',
                        mediaUrl:
                            'http://fashion-cruise.jp/shop/photo/ootoya.jpg',
                        postalCode: '141-0022',
                        address:
                            '東京都品川区東五反田２丁目２−１６ 損保ジャパン五反田共同ビル 2F 富久屋・ニッカ',
                        mapLink:
                            'https://www.google.com/maps/place/大戸屋ごはん処+五反田東口駅前店/@35.625478,139.7212786,13.7z/data=!4m8!1m2!2m1!1z5aSn5oi45bGL!3m4!1s0x0:0xa3b490d12f3e9aeb!8m2!3d35.6256546!4d139.7249472',
                        area: '下'
                    },
                    {
                        name: 'サイゼリヤ 台場フロンティアビル店',
                        postalCode: '135-0091',
                        address:
                            '東京都港区台場２丁目３−２ 台場フロンティアビル',
                        mediaUrl:
                            'https://riverwalk.co.jp/app/wp-content/uploads/2019/03/20190318-saizeriya_logo.jpg',
                        mapLink:
                            'https://www.google.com/maps/place/サイゼリヤ+台場フロンティアビル店/@35.6231294,139.7240531,13z/data=!3m1!5s0x601889f6d5818269:0x4ceb5b0565b8dc70!4m8!1m2!2m1!1z44K144Kk44K844Oq44Ok!3m4!1s0x0:0x9cae73be1064a2cc!8m2!3d35.6287156!4d139.7774649',
                        area: '下'
                    },
                    {
                        name: 'ジョナサン 新小岩駅前店',
                        postalCode: '124-0023',
                        address: '東京都葛飾区東新小岩１丁目１−３',
                        mediaUrl:
                            'https://www.skylark.co.jp/site_resource/jonathan/images/img_ogp.png',
                        mapLink:
                            'https://www.google.com/maps/place/%E3%82%B8%E3%83%A7%E3%83%8A%E3%82%B5%E3%83%B3+%E6%96%B0%E5%B0%8F%E5%B2%A9%E9%A7%85%E5%89%8D%E5%BA%97/@35.720133,139.8607735,14z/data=!4m9!1m3!2m2!1z44Os44K544OI44Op44Oz!6e5!3m4!1s0x0:0xbaec2c2d4711250d!8m2!3d35.7180986!4d139.8583335',
                        area: '右'
                    },
                    {
                        name: 'サイゼリヤ 錦糸町楽天地店',
                        postalCode: '130-0022',
                        address: '東京都墨田区江東橋４丁目２７−１４',
                        mediaUrl:
                            'https://riverwalk.co.jp/app/wp-content/uploads/2019/03/20190318-saizeriya_logo.jpg',
                        mapLink:
                            'https://www.google.com/maps/place/%E3%82%B5%E3%82%A4%E3%82%BC%E3%83%AA%E3%83%A4+%E9%8C%A6%E7%B3%B8%E7%94%BA%E6%A5%BD%E5%A4%A9%E5%9C%B0%E5%BA%97/@35.7071035,139.8269562,14z/data=!4m8!1m2!2m1!1z44K144Kk44K844Oq44Ok!3m4!1s0x0:0xd838527ddd506694!8m2!3d35.6961271!4d139.8153645',
                        area: '右'
                    },
                    {
                        name: 'ガスト 新宿三丁目店',
                        postalCode: '160-0022',
                        address: '東京都新宿区新宿３丁目１７−４ レミナビル',
                        mediaUrl:
                            'https://www.skylark.co.jp/site_resource/gusto/images/img_ogp.png',
                        mapLink:
                            'https://www.google.com/maps/place/%E3%82%AC%E3%82%B9%E3%83%88+%E6%96%B0%E5%AE%BF%E4%B8%89%E4%B8%81%E7%9B%AE%E5%BA%97/@35.6874422,139.6973866,15z/data=!4m8!1m2!2m1!1z44Ks44K544OI!3m4!1s0x0:0x868549e987f260a6!8m2!3d35.6918749!4d139.7033823',
                        area: '左'
                    },
                    {
                        name: 'サイゼリヤ 阿佐ヶ谷駅南口パール商店街店',
                        postalCode: '166-0004',
                        address:
                            '東京都杉並区阿佐谷南１丁目３５−１２ 英ビル 2F',
                        mediaUrl:
                            'https://riverwalk.co.jp/app/wp-content/uploads/2019/03/20190318-saizeriya_logo.jpg',
                        mapLink:
                            'https://www.google.com/maps/place/サイゼリヤ+阿佐ヶ谷駅南口パール商店街店/@35.703191,139.6443604,15z/data=!4m8!1m2!2m1!1z44Os44K544OI44Op44Oz!3m4!1s0x0:0x961531eb7be34230!8m2!3d35.7030907!4d139.636614',
                        area: '左'
                    }
                ]
            }
        }
    },
    mounted() {
        this.proposeActivity(this.cardType)
    },
    methods: {
        proposeActivity(selectedCard) {
            this.showCards = this.activityDB[selectedCard.toLowerCase()]
        },
        sendActivityCard(showCard) {
            db.collection('chat_rooms')
                .doc(this.$route.params.room_id)
                .collection('messages')
                .add({
                    text: `:selectActivitySpot(${JSON.stringify(showCard)}):`,
                    send_uid: this.$auth.state.user.id,
                    receive_uid: this.toTalkUser.toTolk_uid,
                    idRead: false,
                    created: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(
                    this.$emit('closeSelectSpot', {
                        postText: `:selectActivitySpot(${JSON.stringify(
                            showCard
                        )}):`
                    })
                )
        },
        selectActivitySpot(StringJson) {
            this.showCards = [JSON.parse(StringJson)]
            this.showSendBtn = false
            this.showArrow = false
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
}
</style>
