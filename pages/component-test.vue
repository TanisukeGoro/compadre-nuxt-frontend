<template>
    <v-app>
        <v-content>
            <chat-card />
            <chat-card-select />
        </v-content>
    </v-app>
</template>

<script>
import ChatCard from '@/components/chat/ChatCard'
import ChatCardSelect from '@/components/chat/ChatCardSelect'
export default {
    components: {
        ChatCardSelect,
        ChatCard
    },
    data() {
        return {}
    }
}
</script>
