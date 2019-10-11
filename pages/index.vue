<template>
    <top-page-ui />
</template>

<script>
import TopPageUi from '@/components/auth/TopPageUi'
export default {
    middleware: ['auth'],
    layout: 'empty',
    auth: false,
    components: { TopPageUi }
}
</script>
