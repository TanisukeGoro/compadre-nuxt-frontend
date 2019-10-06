<template>
    <div>ddd</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            id: 'default ID'
        }
    },
    layout: 'layout',
    asyncData(context) {
        return {
            id: context.query.id
        }
    }
}
</script>
