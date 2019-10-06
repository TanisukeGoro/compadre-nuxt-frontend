<template>
    <v-card>
        <v-row>
            <v-col :cols="4" class="pr-0">
                <v-container fluid>
                    <v-img
                        class="elevation-6"
                        max-width="100px"
                        src="https://scontent.ffuk4-1.fna.fbcdn.net/v/t1.0-1/p320x320/10393771_1392453211044724_430063713553090743_n.jpg?_nc_cat=106&_nc_oc=AQkSqb-ptorYtsY7QVWQ6obDOkta6OQu_k1Du-vlqemEf_S4rFjmLMLrDKhXdGkqppIdccddclPKkMCQRkOLUUEB&_nc_ht=scontent.ffuk4-1.fna&oh=b3454915b977e13c6c43eee5e8005f6c&oe=5E0806D2"
                    ></v-img>
                </v-container>
            </v-col>
            <v-col>
                <v-container fluid>
                    <v-container>
                        <v-list class="pb-0 pt-0">名前:{{ name }}</v-list>
                        <v-list class="pb-0 pt-0">現在地:{{ genzaiti }}</v-list>
                        <v-row>
                            <v-col class="pb-0 pt-0">仕事:</v-col>
                            <v-col class="pb-0 pt-0">年齢:</v-col>
                        </v-row>
                    </v-container>
                </v-container>
            </v-col>
        </v-row>
        <v-row>
            <v-card-text class="headline font-weight-bold pb-0 pt-0"
                >草しばらく、立ってお祈いのだ。こっちを見ているかもとれなようするといわになるほど激はげしく列れつは。春はあけぼのやうやう白く成りゆく山際少しあかりて白くたなびきたる</v-card-text
            >
        </v-row>
        <v-row>
            <container>
                <v-col>喋れる言語:</v-col>
            </container>
            <v-col>英語</v-col>
            <v-col>日本語</v-col>
        </v-row>
        <v-row>
            <v-container fluid>
                <v-btn>like</v-btn>
            </v-container>
        </v-row>
    </v-card>
</template>
<script>
export default {}
</script>

<style></style>
