<template>
    <v-slider
        v-model="currAge"
        label="年齢"
        :min="minAge"
        :max="maxAge"
        thumb-label
        @input="onChange"
    ></v-slider>
</template>

<script>
export default {
    props: {
        minAge: {
            type: Number,
            default: 0
        },
        maxAge: {
            type: Number,
            default: 100
        }
    },
    data() {
        return {
            currAge: 0
        }
    },
    methods: {
        onChange() {
            this.$emit('input', this.currAge)
        }
    }
}
</script>
