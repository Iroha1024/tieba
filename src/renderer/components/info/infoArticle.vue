<template>
    <div class="infoArticle">
        <router-link :to="{path: 'info/article/' + item.a_id}" tag="div" v-if="item.a_id" 
            class="item" v-for="(item, index) of articles" :key="index" @click.native="hidden">
            <div class="title">{{ item.title }}</div>
            <div class="img">
                <img v-lazy="item.img">
            </div>
            <div class="content">{{ item.content | content }}</div>
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articles: []
        }
    },
    created() {
        this.requestInfoArticle();
    },
    filters: {
        //将含有图片的字符串过滤
        content(val) {
            return val.replace(/\[(.+?)\]/g, '');
        }
    },
    methods: {
        hidden() {
            this.$emit('hidden');
        },
        //请求帖子列表
        requestInfoArticle() {
            let user_id = this.$store.getters.getUser.user_id;
            this.$http.get(this.api + '/info/article/' + user_id)
                .then((result) => {
                    this.articles = result.data.articles;
                    // console.log(this.articles);
                }).catch((err) => {
                    console.log(err);
                });
        }
    }
}
</script>

<style lang="scss" scoped>
    .infoArticle {
        cursor: pointer;
        .item {
            padding: 10px;
            border-bottom: 1px solid $border-color;
            .title {
                font-size: 30px;
            }
            .img {
                width: 300px;
                height: 300px;
                float: left;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .content {
                height: 300px;
                margin: 10px;
                margin-left: 300px;
                padding: 0 20px;
                font-size: 25px;
                line-height: 30px;
                word-break: break-word;
                overflow: hidden;
            }
        }
    }
</style>
