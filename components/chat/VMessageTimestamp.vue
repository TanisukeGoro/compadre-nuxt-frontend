<template>
    <div>
        <div v-if="toTalkUser">
            <div v-if="isOwn">
                <div class="timestamp pr-2 overline">
                    {{ message.created | toHHMM }}
                </div>
                <v-callout v-if="message.audioURL" :is-left="false"
                    ><v-audio :src="message.audioURL"></v-audio
                ></v-callout>
                <v-callout v-else-if="message.text" :is-left="false">{{
                    message.text
                }}</v-callout>
                <v-callout v-else :is-left="false"
                    ><v-img :src="$auth.state.user.icon_url"></v-img
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
                                toTalkUser.toTole_uinfo.icon_url
                                    ? toTalkUser.toTole_uinfo.icon_url
                                    : iconURL
                            "
                            alt="avatar"
                        />
                    </v-avatar>
                </div>
                <div class="nameMessage">
                    <div class="overline py-1">
                        {{ toTalkUser.toTole_uinfo.name || 'untitle' }}
                    </div>
                    <v-callout v-if="message.audioURL"
                        ><v-audio :src="message.audioURL"></v-audio
                    ></v-callout>
                    <v-callout v-else-if="message.text">{{
                        message.text
                    }}</v-callout>
                    <v-callout v-else
                        ><v-img :src="message.imageURL"></v-img
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
            iconURL: `${process.env.AwsStoreImageUrl}images/GDayPwYX4Ioeknxb6R6Dbn9eDHXdr2NNy94Dctp5.jpeg`
        }
    },
    updated() {
        // 更新があったらスクロールする。
        window.scrollTo(0, document.body.clientHeight)
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
