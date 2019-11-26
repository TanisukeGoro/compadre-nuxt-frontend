<template>
    <div class="text-center">
        <v-bottom-sheet v-model="activation">
            <v-sheet
                class="text-center"
                height="230px"
                style="border-top-left-radius: 10px;border-top-right-radius: 10px;"
            >
                <div class="py-1 body-1">
                    <p>
                        {{
                            toTalkUser.toTolk_uinfo.name
                        }}さんにアクティビティを提案する？
                    </p>
                </div>
                <div>
                    <div style="display:inline-block">
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="#F4D76D"
                            style="display:block"
                            @click="startUpRecommendSpot('lunch_dinner')"
                        >
                            <v-icon dark>mdi-food</v-icon>
                        </v-btn>
                        <span class="caption">LUNCH</span>
                    </div>
                    <div style="display:inline-block">
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="#f08080"
                            style="display:block"
                            @click="startUpRecommendSpot('cafe')"
                        >
                            <v-icon dark>mdi-coffee-outline</v-icon>
                        </v-btn>
                        <span class="caption">CAFFE</span>
                    </div>
                    <div style="display:inline-block">
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="#add8e6"
                            style="display:block"
                            @click="startUpRecommendSpot('lunch_dinner')"
                        >
                            <v-icon dark>mdi-silverware-fork-knife</v-icon>
                        </v-btn>
                        <span class="caption">DINNER</span>
                    </div>
                    <br />
                    <div style="display:inline-block">
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="blue-grey"
                            style="display:block"
                            @click="startUpRecommendSpot('activities')"
                        >
                            <v-icon dark>mdi-run-fast</v-icon>
                        </v-btn>
                        <span class="caption">ACTIVITIES</span>
                    </div>
                    <div style="display:inline-block">
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="blue-grey"
                            style="display:block"
                            @click="startUpRecommendSpot('bar')"
                        >
                            <v-icon dark>mdi-glass-cocktail</v-icon>
                        </v-btn>
                        <span class="caption">BAR</span>
                    </div>
                    <div style="display:inline-block">
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="blue-grey"
                            style="display:block"
                            @click="startUpRecommendSpot('shopping')"
                        >
                            <v-icon dark>mdi-cart-outline</v-icon>
                        </v-btn>
                        <span class="caption">SHOPPING</span>
                    </div>
                    <div style="display:inline-block">
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="blue-grey"
                            style="display:block"
                            @click="startUpRecommendSpot('other')"
                        >
                            <v-icon dark>mdi-dots-horizontal</v-icon>
                        </v-btn>
                        <span class="caption">OTHER</span>
                    </div>
                </div>

                <v-btn text color="red" @click="closeRecommendEvent"
                    >close</v-btn
                >
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>

<script>
export default {
    props: {
        recommendEvent: {
            type: Boolean,
            default: false
        },
        toTalkUser: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {}
    },
    computed: {
        activation() {
            return this.recommendEvent
        }
    },
    methods: {
        closeRecommendEvent() {
            this.$emit('closeEvent')
        },
        startUpRecommendSpot(recommendType) {
            this.$emit('selectEventFromChild', { recommendType })
        }
    }
}
</script>
