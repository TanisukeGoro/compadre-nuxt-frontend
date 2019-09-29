<template>
    <div class="text-center">
        <v-chip color="background" disabled>{{
            message.created | toDate
        }}</v-chip>
    </div>
</template>

<script>
export default {
    filters: {
        toDate(val) {
            if (!val) {
                return
            }
            const date = val.toDate()
            return `${1900 + date.getYear()}/${date.getMonth() +
                1}/${date.getDate()}`
        }
    },
    props: {
        message: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style></style>
