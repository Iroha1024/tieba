<template>
    <div class="article">
        <el-scrollbar style="height: 100%">
            <el-container>
                <el-header>
                    <i class="el-icon-back back" @click="back"></i>
                </el-header>
                <el-main>
                    <div class="article-head">
                        <div class="user">
                            <div class="head-img">
                                <img v-lazy="user.user_img">
                            </div>
                            <div class="user-name">{{ user.user_name }}</div>
                        </div>
                        <hr>
                        <div class="article-content">
                            <div class="title">{{ article.title }}</div>
                            <div class="content">
                                <div v-html="article.content"></div>
                            </div>
                        </div>
                    </div>
                    <div class="reply">

                    </div>
                </el-main>
            </el-container>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aid: Number,
            article: {},
            user: {}
        }
    },
    created() {
        this.aid = this.$route.params.aid;
        // console.log('mounted', this.$route.path);
        this.getInfo();
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        getInfo() {
            // console.log('请求');
            this.$http(this.api + '/home/article/' + this.aid)
            .then((result) => {
                this.user = result.data.user;
                this.article = result.data.article;
                // console.log(result.data);
                this.UpdateInfo();
            }).catch((err) => {
                console.log(err);
            });
        },
        UpdateInfo() {
            let img_list = this.article.content.match(/\[(.+?)\]/g);
            if (!img_list) return;
            img_list.forEach(img => {
                img = img.substring(1, img.length - 1);
                this.article.content = this.article.content.replace(/\[(.+?)\]/, `
                    <div class="img">
                        <img src="${img}" style="width: 80%;"></img>
                    </div>
                `)
            });
            // console.log(this.article.content);
        }
    },
}
</script>

<style lang="scss" scoped>
    .article {
        height: 100%;
        .el-container {
            margin: 0 12%;
            .el-header {
                box-shadow: 0px 5px 5px #a7a5a5;
                .back {
                    font-size: 50px;
                }
                .back:hover {
                    background: #3dd2ec;
                    cursor: pointer;
                    border-radius: 25px;
                }
            }
            .el-main {
                .article-head {
                    .user {
                        .head-img {
                            width: 100px;
                            display: inline-block;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .user-name {
                            display: inline-block;
                            font-size: 40px;
                        }
                    }
                    hr {
                        height: 1px;
                        border-top: 1px dashed #585656;
                    }
                    .article-content {
                        font-size: 20px;
                        .title {
                            margin: 10px 0;
                            font-size: 35px;
                        }
                        .content {
                            word-break: break-word;
                            line-height: 25px;
                        }
                    }
                }
            }
        }
    }
</style>
