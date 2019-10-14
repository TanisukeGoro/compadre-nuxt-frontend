<template>
    <div v-show="loading" class="loading">
        <div ref="lavContainer" class="anim"></div>
    </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import loading from '@/assets/animation/loading.json'

export default {
    data: () => ({
        loading: false,
        options: {
            // eslint-disable-next-line no-undef
            animationData,
            loop: false,
            autoplay: false,
            rendererSettings: ''
        }
    }),
    mounted() {
        // eslint-disable-next-line no-undef
        this.anim = lottie.loadAnimation({
            container: this.$refs.lavContainer,
            renderer: 'svg',
            loop: this.options.loop !== false,
            autoplay: this.options.autoplay !== false,
            animationData: this.options.animationData,
            rendererSettings: this.options.rendererSettings
        })
    },
    methods: {
        start() {
            this.anim.play()
            this.loading = true
        },
        finish() {
            this.anim.stop()
            this.loading = false
        }
    }
}
</script>

<style scoped>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
    z-index: 9999;
}

.anim {
    height: 100px;
    margin: 0 auto;
    overflow: hidden;
    width: 100px;
}
</style>
