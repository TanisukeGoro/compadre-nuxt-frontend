<template>
    <v-card max-width="200" color="secondary" flat>
        <v-card-text class="caption py-2"
            >{{
                $auth.state.user.name
            }}さん、こんにちは！<br />以下の日程で都合のいい時間はありますか？よろしくお願いします。</v-card-text
        >
        <v-card-text class="py-0 px-1">
            <v-list
                v-for="(date, index) in dates"
                :key="index"
                class="py-0"
                color="secondary"
            >
                <v-list-item>
                    <div style="min-width:40px">
                        <v-icon
                            v-if="
                                date.timeZone === 'daytime' ||
                                    date.timeZone === 'none'
                            "
                            color="error"
                            class="body-1"
                            >mdi-weather-sunny</v-icon
                        >
                        <v-icon
                            v-if="
                                date.timeZone === 'night' ||
                                    date.timeZone === 'none'
                            "
                            color="accent"
                            class="body-1"
                            >mdi-weather-night</v-icon
                        >
                    </div>

                    <v-list-item-content class="py-0">
                        <v-list-item-title class="caption">{{
                            date.selectDate | showDate
                        }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
            </v-list>
        </v-card-text>
    </v-card>
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
            return `${new Date(date).getMonth() + 1}月${new Date(
                date
            ).getDate()}日${dayOfWeekStr[new Date(date).getDay()]}`
        }
    },
    props: {
        cardType: {
            type: Array,
            default: () => {}
        }
    },
    data() {
        return {
            dates: []
        }
    },
    mounted() {
        this[this.cardType[1]](JSON.parse(this.cardType[2]))
    },
    methods: {
        proposalMeetingDates(dates) {
            this.dates = dates
        }
    }
}
</script>
