<template>
    <div class="homeMain">
        <el-scrollbar style="height: 100%">
            <el-container>
                <el-header style="height: 250px;">
                    <el-carousel :interval="4000" type="card" height="200px">
                        <el-carousel-item v-for="item in 6" :key="item">
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
            info: [],
            head: [],
            main: []
        }
    },
    components: {
        homeArticle
    },
    watch: {
        path(val) {
            this.requestInfo(val);
        },
    },
    methods: {
        //根据path请求信息
        requestInfo(path) {
            //this.$http请求数据info
            this.$http.get(this.api + this.path)
                .then((result) => {
                    //info为空时，初始化
                    if (!this.info[this.path]) {
                        this.info[this.path] = [];
                        this.info[this.path][1] = [];
                    }
                    let head = result.data.articles.head;
                    this.info[this.path][0] = head;
                    this.head = head;
                    let main = result.data.articles.main;
                    this.info[this.path][1].unshift.apply(this.info[this.path][1], main);
                    this.main = this.info[this.path][1];
                    console.log(this.info);
                    console.log(this.info[this.path][1]);
                }).catch((err) => {
                    console.log(err);
                });
        }
    },
    // activated() {
    //     console.log('activated');
    // },
    //子路由切换时修改path
    beforeRouteUpdate (to, from, next) {
        // console.log('update');
        this.path = to.path;
        next();
    },
    //进入home路由时修改path
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // console.log('enter');
            vm.path = to.path;
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
                .el-carousel__item h3 {
                    color: #475669;
                    font-size: 14px;
                    opacity: 0.75;
                    line-height: 200px;
                    margin: 0;
                }
                .el-carousel__item:nth-child(2n) {
                    background-color: #99a9bf;
                }
                .el-carousel__item:nth-child(2n+1) {
                    background-color: #d3dce6;
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
            }
        }
    }
</style>
