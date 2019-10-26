<template>
    <v-dialog
        v-model="matchingDialog"
        fullscreen
        max-width="300"
        height="100%"
        content-class="fullscreen__dialog"
    >
        <div height="100%" class="match__background">
            <h2>{{ 'get matched!!'.toUpperCase() }}</h2>
            <div width="250" class="v_avatar_parent">
                <v-avatar size="100">
                    <v-img
                        :src="$auth.$state.user.icon_url | avatarIconUrl"
                        :lazy-src="'' | avatarIconUrl"
                        class="v_avatar__me v_avatar__add"
                        alt="alt"
                    />
                </v-avatar>
                <v-avatar size="100">
                    <v-img
                        :src="youIconUrl | avatarIconUrl"
                        :lazy-src="'' | avatarIconUrl"
                        class="v_avatar__you v_avatar__add"
                        alt="alt"
                    />
                </v-avatar>
            </div>
            <v-btn
                color="success"
                rounded
                width="250"
                style="margin-top: 20px"
                to="/app/chat"
                nuxt
                >send a message
            </v-btn>
            <v-btn
                color="success"
                outlined
                rounded
                width="250"
                style="margin-top: 20px"
                >view profile</v-btn
            >
            <v-btn
                icon
                style="margin: 20px auto; display:block;"
                x-large
                @click="$emit('input', !matchingDialog)"
                ><v-icon>mdi-close-circle-outline</v-icon></v-btn
            >
        </div>
    </v-dialog>
</template>

<script>
export default {
    props: {
        matchingDialog: {
            type: Boolean,
            default: false
        },
        youIconUrl: {
            type: String,
            default: ''
        },
        youName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    },
    watch: {
        matchingDialog() {
            this.$emit('input', this.matchingDialog)
        }
    },
    methods: {
        closeMatchingDialog() {
            this.$emit('input', this.matchingDialog)
        }
    }
}
</script>

<style>
.fullscreen__dialog {
    background: #fbf2cf;
}
.match__background {
    padding-top: 25%;
    background: linear-gradient(
            to bottom,
            hsla(0, 0%, 100%, 0),
            hsla(47, 86%, 89%, 0.035),
            hsla(47, 86%, 89%, 0.1),
            hsla(47, 86%, 89%, 0.2),
            hsla(47, 86%, 89%, 0.3),
            hsla(47, 86%, 89%, 0.5),
            hsla(47, 86%, 89%, 0.6),
            hsla(47, 86%, 89%, 0.75),
            hsla(47, 86%, 89%, 0.8),
            hsla(47, 86%, 89%, 0.85),
            hsla(47, 86%, 89%, 0.95),
            hsla(47, 86%, 89%, 1)
        ),
        url('~assets/images/confetti_backimg.png');
    background-position: 0 25%;
    background-size: 100%;
    background-repeat: no-repeat;
    height: 100vh;
    text-align: center;
}
.match__background > h2 {
    color: #626262;
    font-size: 22px;
}
.v_avatar_parent {
    margin-top: 20px;
}
.v_avatar__add {
    background-color: #fbf2cf;
    border: #ffffff solid 5px;
    margin-left: 10px;
}
.v_avatar__me {
    /* transform: rotate(345deg); */
}
.v_avatar__you {
    /* transform: rotate(15deg);* */
}
</style>
