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
            <v-btn v-model="fab" color="primary" dark fab>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-pencil-box-multiple-outline</v-icon>
            </v-btn>
        </template>
        <v-btn fab dark small color="#F4D76D" @click="assignState('edit')">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn fab dark small color="#F4D76D" @click="assignState('create')">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="#F4D76D" @click="assignState('delete')">
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
        assignState(mode) {
            this.$emit('assignFromChild', mode)
        }
    }
}
</script>
