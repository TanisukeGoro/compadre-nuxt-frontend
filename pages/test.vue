<template>
    <v-app> </v-app>
</template>

<script>
export default {
    data() {
        return {
            message: ':proposeActivity(Activities):',
            regexp: /^:(.*)\((.*)\):$/
        }
    },
    mounted() {
        let match
        const matches = []
        while ((match = this.regexp.exec(this.message)) !== null) {
            matches.push(match[1])
        }
        console.log(matches)
    },
    methods: {
        proposeActivity(category) {
            console.log(category)
        }
    }
}
</script>
