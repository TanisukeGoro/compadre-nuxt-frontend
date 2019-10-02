<template>
    <v-app>
        <v-content>
            これはテストです
        </v-content>
    </v-app>
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
        console.log(this.message.match(this.regexp))
        const isMatch = this.message.match(this.regexp)
        if (isMatch) {
            console.log(isMatch[1])
            console.log(isMatch[2])
        }
    },
    methods: {
        proposeActivity(category) {
            console.log(category)
        }
    }
}
</script>
