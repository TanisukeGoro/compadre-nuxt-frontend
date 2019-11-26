<template>
    <div>
        <div v-if="toTalkUser">
            <div v-if="isOwn">
                <div class="timestamp pr-2 overline">
                    {{ message.created | toHHMM }}
                </div>
                <v-callout v-if="displayMessage.audioURL" :is-left="false"
                    ><v-audio :src="displayMessage.audioURL"></v-audio
                ></v-callout>
                <v-callout
                    v-else-if="displayMessage.text"
                    :key="displayMessage.text"
                    :is-left="false"
                    >{{ displayMessage.text }}</v-callout
                >
                <v-callout v-else :is-left="false"
                    ><v-img
                        :src="$auth.state.user.icon_url | avatarIconUrl"
                    ></v-img
                ></v-callout>
            </div>
            <template v-else>
                <div class="avatar">
                    <v-avatar
                        class="ma-0"
                        max-width="34px"
                        max-height="34px"
                        min-width="34px"
                        width="34px"
                        height="34px"
                    >
                        <v-img
                            max-width="34px"
                            max-height="34px"
                            :src="
                                toTalkUser.toTolk_uinfo.icon_url | avatarIconUrl
                            "
                            alt="avatar"
                        />
                    </v-avatar>
                </div>
                <div class="nameMessage">
                    <div class="overline py-1">
                        {{ toTalkUser.toTolk_uinfo.name || 'untitle' }}
                    </div>
                    <v-callout v-if="displayMessage.audioURL"
                        ><v-audio :src="displayMessage.audioURL"></v-audio
                    ></v-callout>
                    <v-callout v-else-if="displayMessage.text"
                        >{{ displayMessage.text }}<v-divider />
                        <v-btn
                            color="accent"
                            x-small
                            icon
                            @click="translateText()"
                        >
                            <v-icon>mdi-translate</v-icon></v-btn
                        ></v-callout
                    >
                    <v-callout v-else
                        ><v-img :src="displayMessage.imageURL"></v-img
                    ></v-callout>
                    <div class="timestamp overline">
                        {{ message.created | toHHMM }}
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import VCallout from '~/components/chat/VCallout'
// import translate from '~/plugins/googleTranslate'

export default {
    components: {
        VCallout
    },
    filters: {
        toHHMM(val) {
            if (!val) {
                return
            }
            const date = val.toDate()
            return date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2)
        }
    },
    props: {
        message: {
            type: Object,
            required: true
        },
        isOwn: {
            type: Boolean,
            default: true
        },
        toTalkUser: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            displayMessage: ''
        }
    },
    mounted() {
        this.displayMessage = JSON.parse(JSON.stringify(this.message))
        console.log(this.displayMessage)
    },
    updated() {
        // 更新があったらスクロールする。
        // window.scrollTo(0, document.body.clientHeight)
    },
    methods: {
        async translateText() {
            try {
                const self = this

                await this.$axios
                    .$post(
                        `https://translation.googleapis.com/language/translate/v2?target=${this.$auth.state.user.fst_lang}&key=AIzaSyDihA2W9UXECDVzGSRDGlf_okILwYT2Oow&q=${this.displayMessage.text}`,
                        {},
                        { headers: { Authorization: '' } }
                    )
                    .then((i) => {
                        console.log(i)
                        self.displayMessage.text =
                            i.data.translations[0].translatedText
                    })
                    .catch((err) => {
                        return err.response
                    })
            } catch (error) {}

            // let _text = this.$el.textContent.trim()
            // try {
            //     _text = _text.split(/[0-9]*:[0-9]*\s*/)[1].trim()
            // } catch (error) {
            //     alert('文字列が取得できませんでした。')
            // }
            // console.log(this.$el.innerHTML)
        }
    }
}
</script>

<style scoped>
.avatar {
    display: inline;
    position: absolute;
}

.nameMessage {
    display: inline-block;
    position: relative;
    left: 45px;
}
.timestamp {
    display: inline-block;
}
</style>
