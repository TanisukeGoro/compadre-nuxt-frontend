<template>
    <v-container class="mt-0">
        <v-card
            v-for="(item, index) in items"
            :key="index"
            class="mx-auto mt-2"
            max-width="344"
            outlined
        >
            <v-list-item three-line>
                <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                ></v-list-item-avatar>
                <v-list-item-content>
                    <div class="overline mb-4"></div>
                    <v-list-item-title class="headline mb-1"
                        >Headline 5</v-list-item-title
                    >
                    <v-list-item-subtitle
                        >Greyhound divisely hello coldly
                        fonwderfully</v-list-item-subtitle
                    >
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            items: ''
        }
    },
    mounted() {
        this.items = [
            { message: 'Foo' },
            { message: 'Bar' },
            { message: 'Foo' },
            { message: 'Bar' },
            { message: 'Foo' },
            { message: 'Bar' },
            { message: 'Foo' },
            { message: 'Bar' },
            { message: 'Foo' },
            { message: 'Bar' },
            { message: 'Foo' },
            { message: 'Bar' },
            { message: 'Foo' },
            { message: 'Bar' }
        ]
    }
}
</script>

<style></style>
