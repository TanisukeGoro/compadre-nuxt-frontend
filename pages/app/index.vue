<template>
    <v-content>
        <SelectCard />
        <likeButton />
    </v-content>
</template>
<script>
import SelectCard from '~/components/SelectCard'
// import { firebase, db } from '~/plugins/firebase'
// eslint-disable-next-line no-unused-vars
import likeButton from '~/components/likeButton'

export default {
    components: {
        SelectCard,
        likeButton
    },
    asyncData({ redirect }) {
        redirect(200, '/app/select')
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
