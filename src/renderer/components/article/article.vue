<template>
    <div class="article">
        <el-scrollbar style="height: 100%" id="scrollbar">
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
                    <div class="reply-content">
                        <el-row type="flex" justify="start">
                            <el-col :span="24" v-for="(reply, key) of replies" :key="key">
                                <reply :reply="reply" :floorReplies="floorReplies"></reply>
                            </el-col>
                        </el-row>
                    </div>
                </el-main>
            </el-container>
        </el-scrollbar>
    </div>
</template>

<script>
import reply from './reply';
export default {
    data() {
        return {
            aid: Number,
            article: {},
            user: {},
            replies: {},
            floorReplies: []
        }
    },
    components: {
        reply
    },
    created() {
        this.aid = this.$route.params.aid;
    },
    mounted() {
        let scrollbar = document.getElementById('scrollbar');
        scrollbar.addEventListener('scroll', this.toggleBoxShadow, true);
    },
    methods: {
        //根据滚动条，切换阴影
        toggleBoxShadow() {
            let scrollTop = document.getElementById('scrollbar').children[0].scrollTop;
            let header = document.getElementsByClassName('el-header')[0];
            if (scrollTop == 0) {
                header.style.boxShadow = '0px 5px 5px #a7a5a5';
            } else {
                header.style.boxShadow = 'none';
            }
        },
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
                this.UpdateInfo(this.article, 600);
            }).catch((err) => {
                console.log(err);
            });
        },
        //获取回复
        getReplies() {
            this.$http(this.api + '/home/reply/' + this.aid)
            .then((result) => {
                this.replies = result.data.replies;
                // console.log(result.data);
                this.getFloorReplies();
                this.replies.forEach(reply => {
                    this.UpdateInfo(reply, 400);
                })
            }).catch((err) => {
                console.log(err);
            });
        },
        //获取楼层中回复
        getFloorReplies() {
            this.floorReplies = [];
            this.replies.forEach(reply => {
                if (!reply.is_owner) {
                    this.floorReplies.push(reply);
                }
            })
        },
        //将content中的图片提取
        UpdateInfo(info, img_max_height) {
            let img_list = info.content.match(/\[(.+?)\]/g);
            if (!img_list) return;
            img_list.forEach(img => {
                img = img.substring(1, img.length - 1);
                info.content = info.content.replace(/\[(.+?)\]/, `
                    <div class="img">
                        <img src="${img}" style="max-height: ${img_max_height}px; object-fit: contain; max-width: 100%;"></img>
                    </div>
                `)
            });
            // console.log(this.article.content);
        },
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getInfo();
            vm.getReplies();
        })
    }
}
</script>

<style lang="scss" scoped>
    .article {
        height: 100%;
        .el-container {
            margin: 0 12%;
            .el-header {
                top: 0;
                left: 0;
                position: absolute;
                width: 100%;
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
                margin-top: 60px;
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
                            padding: 10px 0;
                            font-size: 35px;
                        }
                        .content {
                            word-break: break-word;
                            line-height: 25px;
                        }
                    }
                }
                .reply-content {
                    margin-top: 30px;
                    .el-row {
                        flex-wrap: wrap;
                    }
                }
            }
        }
    }
</style>
