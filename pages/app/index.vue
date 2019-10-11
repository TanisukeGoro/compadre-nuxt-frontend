<template>
    <top-page-ui />
</template>

<script>
import TopPageUi from '@/components/auth/TopPageUi'
export default {
    middleware: ['auth'],
    layout: 'empty',
    auth: false,
    components: { TopPageUi },
    asyncData({ redirect }) {
        redirect('/app/select')
    }
}
</script>
