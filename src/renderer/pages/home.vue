<template>
    <div class="home">
        <el-container>
            <el-aside width="150px">
                <home-aside @sendDefaultUrl="initUrl"></home-aside>
            </el-aside>
            <el-main>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import homeAside from 'components/home/homeAside/homeAside.vue'
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
            this.$router.push(url);
        }
    },
    watch: {
        //点击主页时，自动跳转
        retainUrl(val) {
            if (val == '/home') {
                this.$router.push(this.defaultUrl);
            }
        }
    },
    //若曾访问，则回到原先页面
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            // console.log(vm.$router);
            if (vm.retainUrl) {
                vm.$router.push(vm.retainUrl)
            }
        })
    },
    //记录更新路由
    beforeRouteUpdate(to, from, next) {
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
                color: #333;
            }
            .el-main {
                background-color: #E9EEF3;
                color: #333;
            }
        }
    }
</style>
