<template>
    <v-list class="pa-0">
        <v-list-item class="pa-0">
            <v-date-picker
                v-model="dates"
                width="100%"
                multiple
                :min="startDate"
                style="
                        -webkit-box-shadow: 0 1px 1px #888888;
                        -moz-box-shadow: 0 1px 1px #888888;
                        box-shadow: 0 1px 1px #888888;
                    "
            ></v-date-picker>
        </v-list-item>
        <v-list-item v-for="(date, index) in orderdDates" :key="index">
            <v-list-item-content>
                <v-list-item-subtitle>
                    {{ date | showDate }}
                </v-list-item-subtitle>
            </v-list-item-content>
            <div v-if="dates" max-height="40" class="my-0">
                <v-list-item-avatar class="my-0 ml-5">
                    <v-btn
                        outlined
                        rounded
                        :color="
                            checkDateTimeZone[index].timeZone === 'daytime'
                                ? 'accent'
                                : 'activegrey lighten-1'
                        "
                        min-width="70"
                        max-height="28"
                        @click="checkDaytime(date, index)"
                    >
                        <v-icon size="16">mdi-weather-sunny</v-icon>
                    </v-btn>
                </v-list-item-avatar>
                <v-list-item-avatar class="my-0 mr-5">
                    <v-btn
                        outlined
                        rounded
                        :color="
                            checkDateTimeZone[index].timeZone === 'night'
                                ? 'error'
                                : 'activegrey lighten-1'
                        "
                        min-width="70"
                        max-height="28"
                        @click="checkNighttime(date, index)"
                    >
                        <v-icon size="16">mdi-weather-night</v-icon>
                    </v-btn>
                </v-list-item-avatar>
            </div>
        </v-list-item>

        <v-list-item-content
            class="align-center"
            style="width:200px; margin: 0 auto;"
        >
            <v-btn
                :color="orderdDates.length ? 'success' : 'dark'"
                outlined
                rounded
                @click="submitRecommendDate"
                >送信</v-btn
            >
        </v-list-item-content>
    </v-list>
</template>

<script>
export default {
    filters: {
        showDate(date) {
            const dayOfWeekStr = [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ]
            return `${new Date(date).getDate()} ${
                dayOfWeekStr[new Date(date).getDay()]
            }`
        }
    },
    data() {
        return {
            dates: [],
            checkDateTimeZone: [],
            startDate: '',
            test: ''
        }
    },
    computed: {
        orderdDates() {
            const _parseDates = this.dates.map((i) => new Date(i).getTime())
            const _sortedDates = _parseDates.sort().map((i) => new Date(i))
            return _sortedDates
        }
    },
    watch: {
        dates() {
            if (this.dates.length > this.checkDateTimeZone.length) {
                this.checkDateTimeZone.push({
                    selectDate: new Date(this.dates[this.dates.length - 1]),
                    timeZone: 'none'
                })
            } else {
                this.checkDateTimeZone.pop()
            }

            if (this.dates.length > 5) {
                this.dates.pop()
                this.checkDateTimeZone.pop()
            }

            // もし、datesがcheckDateよりも長ければ

            // 短ければ
        }
    },
    updated() {},
    mounted() {
        this.dates = []
        const _date = new Date()
        this.startDate = `${_date.getFullYear()}-${_date.getMonth() +
            1}-${_date.getDate()}`
    },
    methods: {
        popDates() {
            const _ = Object.assign({}, this.dates.pop())
            this.dates = _
        },
        checkDaytime(date, index) {
            this.checkDateTimeZone[index].selectDate = date
            this.checkDateTimeZone[index].timeZone = 'daytime'
        },
        checkNighttime(date, index) {
            this.checkDateTimeZone[index].selectDate = date
            this.checkDateTimeZone[index].timeZone = 'night'
        },
        submitRecommendDate() {
            this.checkDateTimeZone.length = this.dates.length
            this.checkDateTimeZone.map((i) =>
                console.log(i.selectDate, i.timeZone)
            )
            // ないなら送信しない
            if (this.checkDateTimeZone.length === 0) return 0
            const _sendData = this.checkDateTimeZone.map((i) => {
                return { selectDate: i.selectDate, timeZone: i.timeZone }
            })
            this.$emit('sendRecommendationDate', {
                text: `:proposalMeetingDates(${JSON.stringify(_sendData)}):`
            })
        },
        refreshDialog() {
            this.checkDateTimeZone = []
            this.dates = []
        }
    }
}
</script>

<style scoped>
.v-picker__title {
    padding: 10px 28px !important;
    width: 100%;
}
</style>
