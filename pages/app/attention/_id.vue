<template>
    <component
        :is="componentState"
        v-model="model"
        :carousel-count="model"
        :candidates="candidates"
        :hide-delimiters="hideDelimiters"
        :show-arrows="showArrows"
        :touchless="touchLess"
        :card-state="cardState"
    />
</template>

<script>
import GreetingCard from '~/components/GreetingCard'
export default {
    components: {
        // SelectCard
        Default: GreetingCard,
        GreetingCard
    },
    data() {
        return {
            candidates: '',
            model: 0,
            cardState: 'select',
            showArrows: true,
            componentState: 'Default',
            touchLess: false,
            hideDelimiters: true
        }
    },
    asyncData({ $axios, params }) {
        return $axios
            .$get(`${process.env.apiBaseUrl}user/${params.id}`)
            .then((res) => {
                return { candidates: [res.user] }
            })
    }
}
</script>
