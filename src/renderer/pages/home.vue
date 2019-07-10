<template>
    <div class="home">
        <el-container>
            <el-aside>
                <home-aside @sendDefaultUrl="updateUrl"></home-aside>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import homeAside from 'components/home/homeAside/homeAside.vue'
export default {
    data() {
        return {
            retainUrl: ''
        }
    },
    components: {
        homeAside
    },
    methods: {
        updateUrl(url) {
            this.retainUrl = url;
            this.$router.push(url);
        }
    },
    watch: {
        retainUrl(val) {
            if (val == '/home') {
                this.$router.push('/home/recommend');
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
                background-color: #D3DCE6;
                color: #333;
                text-align: center;
            }
            .el-main {
                background-color: #E9EEF3;
                color: #333;
                text-align: center;
            }
        }
    }
    
</style>
