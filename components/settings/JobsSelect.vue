<template>
    <v-combobox
        v-model="select"
        :items="items"
        label="Your Job"
        @change="onChange"
    ></v-combobox>
</template>
<script>
export default {
    data() {
        return {
            select: 'Programming',
            items: ['Programming', 'Design', 'Vue', 'Vuetify']
        }
    },
    methods: {
        onChange() {
            this.$emit('input', this.select)
        }
    }
}
</script>
