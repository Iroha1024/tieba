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
            {
                url: '/home/programming',
                info: '编程'
            },
        ],
        activeUrl: '/home/recommend'
      };
    },
    mounted() {
        this.addChildrenRoute();
        //发送默认跳转url给主页
        this.$emit('sendDefaultUrl', this.link[0].url);
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
        addChildrenRoute() {
            this.link.forEach(link => {
                let url = link.url.split('/').pop();
                // console.log(url);
                this.$router.options.routes[0].children.push({
                    name: url,
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
