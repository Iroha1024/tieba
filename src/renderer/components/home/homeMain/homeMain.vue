<template>
    <div class="homeMain">
        <el-scrollbar style="height: 100%">
            <el-container>
                <el-header style="height: 250px;">
                    <el-carousel :interval="4000" type="card" height="200px">
                        <el-carousel-item v-for="(carousel, key) of head" :key="key">
                            <img v-lazy="carousel.imgUrl">
                            <h3 class="medium"></h3>
                        </el-carousel-item>
                    </el-carousel>
                </el-header>
                <el-main>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="10" v-for="(article, key) of main" :key="key">
                            <home-article :article="article"></home-article>
                        </el-col>
                    </el-row>
                    <el-backtop class="backtop" target=".homeMain .el-scrollbar__wrap" :bottom="120">
                        <i class="iconfont top">&#xe62a;</i>
                    </el-backtop>
                    <div class="iconfont">
                        <i class="refresh" @click="requestInfo(path)">&#xe638;</i>
                    </div>
                </el-main>
            </el-container>
        </el-scrollbar>
    </div>
</template>

<script>
import homeArticle from 'components/home/homeMain/homeArticle';
export default {
    data() {
        return {
            path: '',
            pathSet: new Set(),
            info: [],
            head: [],
            main: []
        }
    },
    components: {
        homeArticle
    },
    methods: {
        getInfo(path) {
            if (this.checkPathExisted(path)) return;
            this.initInfo(path);
            this.requestInfo(path);
        },
        //检验path是否存在
        checkPathExisted(path) {
            //path曾经存在，读取info
            if (this.pathSet.has(path)) {
                // console.log('in');
                this.head = this.info[path].head;
                this.main = this.info[path].main;
                // console.log(this.info[path]);
                return true;
            }
        },
        //初始化各个path对应数组（info:[path:{head:[], main:[]}, path:{}）
        initInfo(path) {
            //info[path]为空时，初始化
            if (!this.info[path]) {
                this.info[path] = {};
                this.info[path].head = [];
                this.info[path].main = [];
            }
            this.pathSet.add(path);
            // console.log(this.pathSet);
        },
        //根据path请求信息
        requestInfo(path) {
            // console.log('请求');
            //this.$http请求数据info
            this.$http.get(this.api + path)
            .then((result) => {
                // console.log(result.data);
                let head = result.data.articles.head;
                this.info[path].head = head;
                this.head = head;
                let main = result.data.articles.main;
                this.info[path].main.unshift.apply(this.info[path].main, main);
                this.main = this.info[path].main;
                // console.log(this.info);
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    //子路由切换时修改path
    beforeRouteUpdate (to, from, next) {
        // console.log('update', to.path);
        this.path = to.path;
        this.getInfo(this.path);
        next();
    },
    //进入home路由时修改path
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // console.log('enter', to.path);
            vm.path = to.path;
            vm.getInfo(vm.path);
        });
    }
}
</script>

<style lang="scss" scoped>
    .homeMain {
        height: 100%;
        .el-container {
            margin: 0 5%;
            .el-header {
                .el-carousel__item {
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: fill;
                    }
                    h3 {
                        color: #475669;
                        font-size: 14px;
                        opacity: 0.75;
                        line-height: 200px;
                        margin: 0;
                    }
                }
            }
            .el-main {
                .el-row {
                    flex-wrap: wrap;
                }
                .el-col {
                    border-radius: 4px;
                    margin-bottom: 40px;
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
                .refresh {
                    position: absolute;
                    font-size: 40px;
                    border-radius: 20px;
                    background: $bg-color;
                    right: 25px;
                    bottom: 20px;
                    transition: transform 1s;
                    cursor: pointer;
                }
                .refresh:hover {
                    transform: rotate(360deg);
                    background: $icon-hover-color;
                }
            }
        }
    }
</style>
