<template>
    <v-speed-dial
        v-model="fab"
        absolute
        :top="false"
        :bottom="true"
        :right="true"
        :left="false"
        :direction="'top'"
        :open-on-hover="true"
        :transition="'scale-transition'"
    >
        <template v-slot:activator>
            <v-btn v-model="fab" color="blue darken-2" dark fab>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-pencil-box-multiple-outline</v-icon>
            </v-btn>
        </template>
        <v-btn fab dark small color="green" @click="editGreeting">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo" @click="newGreeting">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="red" @click="deleteGreeting">
            <v-icon>mdi-delete</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
export default {
    data() {
        return {
            fab: false
        }
    },
    methods: {
        newGreeting() {
            this.$emit('')
        },
        editGreeting() {
            this.$emit('')
        },
        deleteGreeting() {
            this.$emit('')
        }
    }
}
</script>
