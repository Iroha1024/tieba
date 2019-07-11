<template>
    <div id="bottom-nav">
        <router-link tag="div" :to="item.url" v-for="(item, index) of link" :key="index"
            class="iconfont" :class="{hover: !item.activate}">
            <div :class="{clicked: item.activate}">
                {{ item.icon }}
                <p class="info">{{ item.info }}</p>
            </div>
        </router-link>  
    </div>
</template>

<script>
export default {
    data() {
        return {
            link: [
                {
                    url: '/home',
                    icon: '\ue600',
                    activate: false,
                    info: '主页'
                },
                {
                    url: '/follow',
                    icon: '\ue607',
                    activate: false,
                    info: '关注'
                },
                {
                    url: '/message',
                    icon: '\ue60d',
                    activate: false,
                    info: '通知'
                },
                {
                    url: '/info',
                    icon: '\ue608',
                    activate: false,
                    info: '我的'
                },
            ],
        }
    },
    watch: {
        $route(to, from) {
            this.link.forEach((item) => {
                //路由切换时，改变对应背景颜色
                let url = '/' + this.$route.path.split('/')[1];
                item.activate = item.url == url;
            })
        },
    },
}
</script>

<style lang="scss" scoped>
// @import '~css/global';
    #bottom-nav {
        position: absolute;
        bottom: 0;
        width: 100%;
        //消除display带来的间隙
        font-size:0;
        border-radius: 15px 15px 0 0;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        background: $bg-color;
        div {
            display: inline-block;
            width: 25%;
            border-radius: 15px 15px 0 0;
            text-align: center;
            font-size: $bottom-nav-height * 0.5;
            height: $bottom-nav-height;
            line-height: $bottom-nav-height * 0.8;
            cursor: pointer;
            .clicked {
                width: $bottom-nav-height;
                height: $bottom-nav-height;
                border-radius: $bottom-nav-height / 2;
                background: $clicked-color;
            }
            .info {
                font-size: 15px;
                line-height: 0;
            }
        }
        .hover:hover {
            background: $hover-color;
        }
    }
</style>
