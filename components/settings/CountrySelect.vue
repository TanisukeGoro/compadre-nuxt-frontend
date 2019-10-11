<template>
    <v-combobox
        v-model="select"
        :items="items"
        multiple
        label="Target country"
        @change="onChange"
    ></v-combobox>
</template>
<script>
export default {
    data() {
        return {
            select: [],
            items: [
                'Australia',
                'Canada',
                'Saudi Arabia',
                'America',
                'India',
                'Russia',
                'South Africa',
                'Turkey',
                'Argentina',
                'Brazil',
                'Mexico',
                'France',
                'Germany',
                'Italy',
                'England',
                'China',
                'Indonesia',
                'Japan',
                'Korea',
                'Philippines',
                'Singapore',
                'Thailand',
                'Vietnam',
                'Malaysia'
            ]
        }
    },
    methods: {
        onChange() {
            this.$emit('input', this.select)
        }
    }
}
</script>
