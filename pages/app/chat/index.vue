<template>
    <div>
        pages/chat/index.vue
        <p>
            <nuxt-link to="/app">/app</nuxt-link>
        </p>

        <p>
            <nuxt-link to="/app/settings">/app/settings</nuxt-link>
        </p>

        <p>
            <nuxt-link to="/app/attention-card">/app/attention-card</nuxt-link>
        </p>

        <p>
            <nuxt-link to="/app/attention-me">/app/attention-me</nuxt-link>
        </p>

        <p>
            <nuxt-link to="/app/edit-profile">/app/edit-profile</nuxt-link>
        </p>

        <p>
            <nuxt-link to="/chat">/chat</nuxt-link>
        </p>

        <p>
            <nuxt-link to="/chat/jieajf">/chat/jieajf</nuxt-link>
        </p>
        <chatCard />
        <chatCardSerect />
    </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import chatCard from '~/components/chatCard'
// eslint-disable-next-line no-unused-vars
import chatCardSerect from '~/components/chatCardSerect'

export default {
    components: {
        // eslint-disable-next-line vue/no-unused-components
        chatCard,
        // eslint-disable-next-line vue/no-unused-components
        chatCardSerect
    }
}
</script>
