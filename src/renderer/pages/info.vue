<template>
    <div class="info">
        <el-scrollbar style="height: 100%" v-show="show">
            <el-container>
                <el-header style="height: 100%">
                    <div class="bg-img">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564058188123&di=6200736908c5f90ca9a86f5e09f0ee6b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F15%2F20170715114413_uNWMF.jpeg">
                    </div>
                    <div class="content">
                        <div class="head-img">
                            <img v-lazy="getUser.user_img">
                        </div>
                        <div class="profile">
                            <div class="username">
                                {{ getUser.user_name }}
                            </div>
                            <div class="edit">
                                <el-button type="primary">编辑资料</el-button>
                            </div>
                            <div class="exit" @click="exit">
                                <i class="el-icon-switch-button"></i>
                            </div>
                        </div>
                    </div>
                </el-header>
                <el-main>
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="帖子" name="first">
                            <info-article @hidden="hidden"></info-article>
                        </el-tab-pane>
                        <el-tab-pane label="其他" name="second">其他</el-tab-pane>
                    </el-tabs>
                </el-main>
            </el-container>
        </el-scrollbar>
        <keep-alive>
            <router-view :key="$route.path"></router-view>
        </keep-alive>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import infoArticle from 'components/info/infoArticle';
export default {
    data() {
        return {
            activeName: 'first',
            show: true,
        };
    },
    components: {
        infoArticle
    },
    inject: ['reload'],
    // created() {
    //     let user = {
    //         user_id: 8,
    //         user_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1563186077&di=81f3a719d4315d27a500d7b8e4abc00f&src=http://b-ssl.duitang.com/uploads/item/201607/30/20160730131742_TNhdE.thumb.700_0.jpeg",
    //         user_name: 'iroha'
    //     }
    //     this.$store.dispatch('initUser', user);
    // },
    computed: {
        ...mapGetters([
            'getUser'
        ])
    },
    watch: {
        //回到info页面时显示
        $route() {
            if (this.$route.path == '/info') {
                this.show = true;
            }
        }
    },
    methods: {
        //隐藏info页面
        hidden() {
            this.show = false;
        },
        //注销
        exit() {
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                    h('span', null, '账号注销'),
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        //退出登录
                        this.$store.dispatch('initUser', '');
                        this.reload();
                        this.$router.push('/login');
                        done();
                    } else {
                        done();
                    }
                }
            })
            .catch(() => {})
        },
    },
}
</script>

<style lang="scss" scoped>
    .info {
        height: calc(100% - #{$bottom-nav-height});
        background: $bg-color;
        .el-container {
            margin: 0 10%;
            .el-header {
                margin: 10px 0;
                padding: 0;
                box-shadow: 0px 0px 5px #aba2a2;
                .bg-img {
                    height: 200px;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .content {
                    padding: 30px;
                    position: relative;
                    background: #fff;
                    .head-img {
                        width: 150px;
                        position: absolute;
                        top: -50px;
                        left: 50px;
                        padding: 5px;
                        background: #fff;
                        border-radius: 5px;
                        img {
                            width: 100%;
                        }
                    }
                    .profile {
                        padding: 0 20px;
                        border-left: 180px solid transparent;
                        position: relative;
                        .username {
                            font-size: 30px;
                        }
                        .edit {
                            padding-top: 20px;
                        }
                        .exit {
                            font-size: 40px;
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            border-radius: 20px;
                        }
                        .exit:hover {
                            cursor: pointer;
                            background: $icon-hover-color;
                        }
                    }
                }
            }
            .el-main {
                padding: 40px;
                box-shadow: 0px 0px 5px #aba2a2;
                background: #fff;
            }
        }
    }
</style>
