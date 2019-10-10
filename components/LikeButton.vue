<template>
    <v-row>
        <v-layout justify-center class="btn">
            <v-btn
                rounded
                dark
                :loading="!btnState"
                class="mb-5 btn"
                style="background: linear-gradient(to right, #70e1f5, #ffd194);"
                @click="$emit('ClickLikebutton')"
                >Hi!</v-btn
            >
        </v-layout>
    </v-row>
</template>

<script>
export default {
    props: {
        btnState: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
.btn {
    padding-top: 50px;
}
</style>
