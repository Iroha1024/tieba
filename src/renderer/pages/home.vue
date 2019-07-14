<template>
    <div class="home">
        <el-container>
            <el-aside width="150px">
                <home-aside @sendDefaultUrl="initUrl"></home-aside>
            </el-aside>
            <el-main>
                <keep-alive>
                    <router-view :key="$route.path"></router-view>
                </keep-alive>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import homeAside from 'components/home/homeAside/homeAside'
export default {
    data() {
        return {
            retainUrl: '',
            defaultUrl: ''
        }
    },
    components: {
        homeAside
    },
    methods: {
        //初始化时设置url
        initUrl(url) {
            this.defaultUrl = url;
            this.retainUrl = url;
            this.$router.push(url);
            // console.log('push');
        }
    },
    //若曾访问，则回到原先页面
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            // console.log('enter', to.path);
            //非home页面访问才用跳转原先页面
            if (to.path != '/home') return;
            if (vm.retainUrl) {
                vm.$router.push(vm.retainUrl)
            }
        })
    },
    //记录更新路由
    beforeRouteUpdate(to, from, next) {
        // console.log('update',to.path);
        this.retainUrl = to.path;
        next();
    }
}
</script>

<style lang="scss" scoped>
    .home {
        height: 100%;
        .el-container {
            height: 100%;
            .el-aside {
                background-color: #fff;
                color: $font-color;
            }
            .el-main {
                padding-bottom: $bottom-nav-height;
                background-color: $bg-color;
                color: $font-color;
            }
        }
    }
</style>
