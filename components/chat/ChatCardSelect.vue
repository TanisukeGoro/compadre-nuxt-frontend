<template>
    <v-row>
        <v-container fluid style="display: contents;">
            <v-col
                v-for="(item, i) in items"
                :key="i"
                style="text-align: center;"
                @click="selectCard(item.title)"
            >
                <v-btn
                    outlined
                    dark
                    style="border-radius: 1em; width: 150px; height: 50px;"
                    elevation="5"
                    text
                    color="accent"
                >
                    <v-list-item-title>
                        <v-list-item-title
                            class="title"
                            v-text="item.title"
                        ></v-list-item-title>
                    </v-list-item-title>
                </v-btn>
            </v-col>
        </v-container>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        items: [
            {
                title: 'Lunch'
            },
            {
                title: 'Cafe'
            },
            {
                title: 'Dinner'
            },
            {
                title: 'Activities'
            },
            {
                title: 'Bar'
            },
            {
                title: 'Shopping'
            },
            {
                title: 'other'
            }
        ]
    }),
    methods: {
        selectCard(select) {
            this.$emit('selectCardFromChild', { select })
        }
    }
}
</script>
