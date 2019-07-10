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
}
</script>

<style lang="scss" scoped>
    /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .homeAside {
        height: calc(100% - 50px);
        .el-menu-item {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
