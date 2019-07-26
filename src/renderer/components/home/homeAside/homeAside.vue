<template>
    <div class="homeAside">
        <el-scrollbar style="height:100%">
            <el-menu :default-active="activeUrl" class="el-menu-vertical-demo" :router="true">
                <el-menu-item v-for="(item, key) of link" :key="key" :index="item.url">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ item.info }}</span>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    data() {
      return {
        link: [
            {
                url: '/home/recommend',
                info: '推荐'
            },
        ],
        path: '/home',
        activeUrl: '/home/recommend'
      };
    },
    created() {
        //发送默认跳转url给主页
        this.$emit('sendDefaultUrl', this.link[0].url);
        this.getLinkList();
    },
    watch: {
        //路由变化时，更换激活图标
        $route(to, from) {
            let itemList = document.getElementsByClassName('el-menu-item');
            for (let i = 0; i < itemList.length; i++) {
                if (this.link[i].url == this.$route.path) {
                    this.activeUrl = this.link[i].url;
                }
            }
        },
    },
    methods: {
        //vuex中获取关注吧列表
        getLinkList() {
            let user = this.$store.getters.getUser;
            // console.log(user);
            user.ba_follow_list.forEach(item => {
                this.link.push({
                    url:  '/home/' + item.ba_url,
                    info: item.ba_name
                })
            })
            this.addChildrenRoute();
            this.$router.push(this.link[0].url);
        },
        //添加子路由
        addChildrenRoute() {
            this.link.forEach(link => {
                let url = link.url.split('/').pop();
                // console.log(url);
                let home;
                this.$router.options.routes.forEach(route => {
                    if (route.path == '/home') {
                        home = route;
                    }
                })
                home.children.push({
                    // name: url,
                    path: url,
                    component: () => import('components/home/homeMain/homeMain'),
                })
            })
            this.$router.addRoutes(this.$router.options.routes);
            // console.log(this.$router);
        }
    },
}
</script>

<style lang="scss" scoped>
    .homeAside {
        height: calc(100% - #{$bottom-nav-height});
        .el-menu-item {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
