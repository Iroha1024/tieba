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
import global from 'css/global.scss'

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
            body.style.background = global.bgColor;
        }
    },
}
</script>

<style lang="scss" scoped>
    #app {
        height: calc(100% - 30px);
    }
</style>
