<template>
    <div>
        <div v-for="(text, index) in name.split('\n')" :key="index">
            {{ text }}
        </div>
        <p>{{ age }}</p>
        <p>{{ home }}</p>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        age: {
            type: Number,
            default: 0
        },
        home: {
            type: String,
            default: ''
        }
    }
}
</script>
