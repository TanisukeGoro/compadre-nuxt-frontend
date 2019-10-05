<template>
    <v-app>
        <v-content>
            <v-container>
                <div>{{ ID }}</div>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            ID: ''
        }
    },
    mounted() {
        this.ID = this.$route.params.id
    }
}
</script>
