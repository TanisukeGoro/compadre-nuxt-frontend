<template>
    <v-row>
        <v-col v-for="(item, i) in items" :key="i">
            <v-card :color="item.color" dark>
                <v-list-item three-line>
                    <v-list-item-avatar size="60" tile class="img">
                        <v-img :src="item.src"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content class="align-self-start">
                        <v-list-item-title
                            class="headline mb-2 fonntColor"
                            v-text="item.title"
                        ></v-list-item-title>

                        <v-list-item-content
                            class="Color"
                            v-text="item.artist"
                        ></v-list-item-content>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data: () => ({
        items: [
            {
                color: '#FAFAFA',
                src:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Mona_Lisa_detail_face.jpg/210px-Mona_Lisa_detail_face.jpg',
                title: 'name',
                artist: 'Foster the People'
            },
            {
                color: '#FAFAFA',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'name',
                artist: 'Ellie Goulding'
            },
            {
                color: '#FAFAFA',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'name',
                artist: 'Ellie Goulding'
            },
            {
                color: '#FAFAFA',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'name',
                artist: 'Ellie Goulding'
            },
            {
                color: '#FAFAFA',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'name',
                artist: 'Ellie Goulding'
            },
            {
                color: '#FAFAFA',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'name',
                artist: 'Ellie Goulding'
            },
            {
                color: '#FAFAFA',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'name',
                artist: 'Ellie Goulding'
            },
            {
                color: '#FAFAFA',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'name',
                artist: 'Ellie Goulding'
            },
            {
                color: '#FAFAFA',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'name',
                artist: 'Ellie Goulding'
            },
            {
                color: '#FAFAFA',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'name',
                artist: 'Ellie Goulding'
            },
            {
                color: '#FAFAFA',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'name',
                artist: 'Ellie Goulding'
            },
            {
                color: '#FAFAFA',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'name',
                artist: 'Ellie Goulding'
            }
        ]
    })
}
</script>
