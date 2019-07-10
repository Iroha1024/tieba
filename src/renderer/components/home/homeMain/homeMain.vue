<template>
    <div class="">
        {{ info }}
        123
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: ''
        }
    },
    mounted () {
        // console.log(this.$route)
        this.info = this.$route.path
    },
    watch: {
        $route(to, from) {
            this.info = this.$route.path;
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
