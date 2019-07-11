<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script>
import bottomNav from 'components/bottomNavigation/bottomNavigation'

export default {
    name: 'tieba',
    components: {
        bottomNav
    },
    created() {
        this.changeBodyStyle();
    },
    methods: {
        changeBodyStyle() {
            let body = document.body;
            body.style.height = '100%';
        }
    },
}
</script>

<style lang="scss" scoped>
    #app {
        height: 100%;
    }
</style>
