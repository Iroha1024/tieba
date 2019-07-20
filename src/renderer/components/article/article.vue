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
                                <reply :reply="reply" :floorReplies="floorReplies" :index="key" @submitReply="submitReply"></reply>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="comments-section">
                        <p>发表回复</p>
                        <div class="input">
                            <div class="list">
                                <div class="icon"><i class="el-icon-picture"></i></div>
                                <div class="icon"><i class="el-icon-cherry"></i></div>
                            </div>
                            <div class="text" id="comments-div" contenteditable="true"></div>
                        </div>
                        <el-button type="primary" icon="el-icon-upload" @click="submitComments">发表</el-button>
                    </div>
                    <el-backtop class="backtop" target=".article .el-scrollbar__wrap" :bottom="80">
                        <i class="iconfont top">&#xe62a;</i>
                    </el-backtop>
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
            floorReplies: [],
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
        //根据滚动条，切换阴影是否显示
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
        //获取帖子及用户信息
        getInfo() {
            // console.log('请求');
            this.$http.get(this.api + '/home/article/' + this.aid)
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
            this.$http.get(this.api + '/home/reply/' + this.aid)
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
        //提交楼层回复
        submitReply(reply) {
            reply.a_id = this.aid;
            this.postReply(reply);
        },
        //提交评论区回复
        submitComments() {
            let div = document.getElementById('comments-div');
            let text = div.innerText;
            if (!text) {
                const h = this.$createElement;
                this.$msgbox({
                    title: '警告',
                    message: h('p', null, [
                        h('span', { style: 'color: #f00' }, '输入内容不能为空！！！'),
                    ]),
                    confirmButtonText: '确定',
                })
                return;
            }
            let reply = {
                a_id: this.aid,
                user_id: 8,
                floor_id: null,
                content: text,
                is_owner: 1,
                target: null
            }
            // console.log(reply);
            this.getFloorId(reply);
        },
        //获取当前最后层数
        getFloorId(reply) {
            this.$http.get(this.api + '/home/reply/floorId/' + reply.a_id) 
            .then((result) => {
                // console.log(result.data.floor_id);
                reply.floor_id = result.data.floor_id + 1;
                this.postReply(reply);
                document.getElementById('comments-div').innerText = '';
            }).catch((err) => {
                console.log(err);
            });
        },
        postReply(reply) {
            this.$http.post(this.api + '/home/reply', {
                reply
            })
            .then((result) => {
                // console.log(result);
                if (result.data.success) {
                    //若成功，刷新回复
                    this.getReplies();
                }
            }).catch((err) => {
                console.log(err);
            });
        }
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
                    background: $icon-hover-color;
                    cursor: pointer;
                    border-radius: 25px;
                }
            }
            .el-main {
                margin-top: 60px;
                .article-head {
                    border: 1px solid #d7d7d7;
                    padding: 10px;
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
                .comments-section {
                    border: 1px solid #d7d7d7;
                    padding: 30px;
                    p {
                        margin: 0 0 20px;
                        font-size: 20px;
                    }
                    .input {
                        border: 1px solid #d7d7d7;
                        padding: 10px 20px 20px;
                        .list {
                            width: 100%;
                            font-size: 0;
                            .icon {
                                font-size: 20px;
                                display: inline-block;
                                padding: 10px;
                                border-radius: 20px;
                                cursor: pointer;
                            }
                            .icon:hover {
                                background: $icon-hover-color;
                            }
                        }
                        .text {
                            height: 200px;
                            background: #fff;
                            outline: none;
                            box-sizing: border-box;
                        }
                        .text:focus {
                            border: 1px solid #2fc4c4;
                        }
                    }
                    .el-button {
                        margin: 20px 0 0;
                    }
                }
                .backtop {
                    width: 50px;
                    height: 50px;
                    .top {
                        font-size: 30px;
                        color: $font-color;
                    }
                }
                .backtop:hover {
                    background: $icon-hover-color;
                }
            }
        }
    }
</style>
