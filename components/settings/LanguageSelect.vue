<template>
    <v-combobox
        v-model="select"
        :items="items"
        label="Target language"
        multiple
        @change="onChange"
    ></v-combobox>
</template>
<script>
export default {
    data() {
        return {
            select: [],
            items: [
                'Japanese',
                'English',
                'Chinese',
                'Korean',
                'Russian',
                'Portuguese',
                'Spanish',
                'French',
                'German',
                'Italian',
                'Malay',
                'Tagalog',
                'Vietnamese',
                'Thai',
                'Formosan',
                'other'
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
