<template>
    <v-row>
        <v-container fluid>
            <v-col
                v-for="(item, i) in items"
                :key="i"
                style="text-align: center;"
            >
                <v-btn
                    :style="item.background"
                    dark
                    style="border-radius: 1em; width: -webkit-fill-available;"
                    elevation="5"
                    text
                    color="white accent-4"
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
                background:
                    'background: linear-gradient(to right, #fdc830, #f37335);',
                title: 'Lunch'
            },
            {
                background:
                    'background: linear-gradient(to right, #ba8b02, #181818);',
                title: 'Cafe'
            },
            {
                background:
                    'background: linear-gradient(to right, #232526, #414345);',
                title: 'Dinner'
            },
            {
                background:
                    'background: linear-gradient(to right, #22c1c3, #fdbb2d); ',
                title: 'Activities'
            },
            {
                background:
                    'background: linear-gradient(to right, #23074d, #cc5333);',
                title: 'Bar'
            },
            {
                background:
                    'background: linear-gradient(to right, #feac5e, #c779d0, #4bc0c8);',
                title: 'Shopping'
            },
            {
                background:
                    'background: linear-gradient(to right, #616161, #9bc5c3);',
                title: 'other'
            }
        ]
    })
}
</script>
