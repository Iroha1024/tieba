<template>
    <div class="">
        <router-link :to="{path: 'article/' + article.a_id}" tag="div" v-if="article.a_id">
            <div class="grid-content">
                <div class="img">
                    <img v-lazy="article.img"></img>
                </div>
                <div class="word">
                    <div class="title">{{ article.title }}</div>
                    <div class="content">{{ article.content | content }}</div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        article: ''
    },
    filters: {
        //将含有图片的字符串过滤
        content(val) {
            return val.replace(/\[(.+?)\]/g, '');
        }
    }
}
</script>

<style lang="scss" scoped>
    .grid-content {
        position: relative;
        height: 280px;
        background: #d3dce6;
        overflow: hidden;
        cursor: pointer;
        .img {
            height: 100%;
            width: 100%;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .img::before {
            content: '';
            width: 120%;
            height: 30%;
            background: linear-gradient(0, rgba(255, 255, 255, 0.3), #e1e1e1);
            left: -10%;
            bottom: -10px;
            position: absolute;
            filter: blur(10px);
        }
        .word {
            position: relative;
            bottom: 25%;
            width: 100%;
            .title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 30px;
            }
            .content {
                word-break: break-word;
                font-size: 20px;
                line-height: 20px;
            }
        }
    }
</style>
