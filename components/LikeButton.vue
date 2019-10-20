<template>
    <v-row>
        <v-layout justify-center>
            <v-btn
                rounded
                dark
                :loading="!btnState"
                class="mb-5 btn"
                width="200"
                style="background: linear-gradient(to right, #70e1f5, #ffd194); font-size: x-large;"
                @click="$emit('ClickLikebutton')"
            >
                <v-icon>mdi-human-greeting</v-icon>
                Say Hi!</v-btn
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
