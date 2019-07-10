<template>
    <div class="">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu :default-active="activeUrl" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
            <el-menu-item v-for="(item, key) of link" :key="key" :index="item.url">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ item.info }}</span>
            </el-menu-item>
            
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
      return {
        isCollapse: true,
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
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
