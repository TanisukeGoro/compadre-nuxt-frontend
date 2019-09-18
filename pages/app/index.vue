<template>
    <v-content>
        <SelectCard />
    </v-content>
</template>

<script>
import SelectCard from '~/components/SelectCard'
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
