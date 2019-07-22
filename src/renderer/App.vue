<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <bottom-nav v-if="getUser"></bottom-nav>
    </div>
</template>

<script>
import bottomNav from 'components/bottomNavigation/bottomNavigation'
import { mapGetters } from 'vuex';

export default {
    name: 'tieba',
    components: {
        bottomNav
    },
    created() {
        this.$store.dispatch('initUser', '');
        // console.log('app', this.$store.getters.getUser);
        this.changeBodyStyle();
    },
    computed: {
        ...mapGetters([
            'getUser'
        ])
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
        font-family: KaiTi_GB2312;
    }
</style>
