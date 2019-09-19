<template>
    <v-content>
        <SelectCard />
    </v-content>
</template>

<script>
import SelectCard from '~/components/SelectCard'
// import { firebase, db } from '~/plugins/firebase'
export default {
    components: {
        SelectCard
    },
    methods: {
        async logout() {
            try {
                const response = await this.$auth.logout()
                return response
            } catch (error) {}
        }
    }
}
</script>
