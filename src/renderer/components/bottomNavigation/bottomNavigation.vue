<template>
    <div id="bottom-nav">
        <router-link tag="div" :to="item.url" v-for="(item, index) of link" :key="index"
            class="iconfont" :class="{hover: !item.activate}" @click.native="toggleBgColor(index)">
            <div :class="{clicked: item.activate}">
                {{ item.icon }}
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
                    activate: true
                },
                {
                    url: '/follow',
                    icon: '\ue607',
                    activate: false
                },
                {
                    url: '/message',
                    icon: '\ue60d',
                    activate: false
                },
                {
                    url: '/info',
                    icon: '\ue608',
                    activate: false
                },
            ]
        }
    },
    methods: {
        //路由切换时，改变对应背景颜色
        toggleBgColor(index) {
            this.link.forEach((item) => {
                item.activate = false;
            })
            this.link[index].activate = true;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~css/global';
    #bottom-nav {
        position: absolute;
        bottom: 0;
        width: 100%;
        //消除display带来的间隙
        font-size:0;
        div {
            display: inline-block;
            width: 25%;
            border-radius: 15px 15px 0 0;
            text-align: center;
            font-size: $bnHeight * 0.625;
            height: $bnHeight;
            line-height: $bnHeight;
            cursor: pointer;
        }
        .hover:hover {
            background: $hoverColor;
        }
        .clicked {
            width: $bnHeight;
            height: $bnHeight;
            border-radius: $bnHeight / 2;
            background: $clickedColor;
        }
    }
</style>
