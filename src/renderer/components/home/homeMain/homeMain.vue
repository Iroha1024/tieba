<template>
    <div class="homeMain">
        <el-scrollbar style="height: 100%">
            <el-container>
                <el-header style="height: 250px;">
                    <el-carousel :interval="4000" type="card" height="200px">
                        <el-carousel-item v-for="item in 6" :key="item">
                            <h3 class="medium">{{ testData }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </el-header>
                <el-main>
                    <el-row :gutter="40" v-for="item in 3" :key="item">
                        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
                    </el-row>
                </el-main>
            </el-container>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            path: '',
            info: []
        }
    },
    mounted () {
        //初始化path
        this.path = this.$route.path
        // console.log(this.path);
    },
    watch: {
        path(val) {
            this.requestInfo(val);
        }
    },
    computed: {
        testData() {
            if(!this.info[this.path]) return;
            let arr = this.info[this.path]
            return arr[0].head + '' + arr[1].main
        }
    },
    methods: {
        //根据path请求信息
        requestInfo(path) {
            //this.$http请求数据info
            let info = [{head:'head2'}, {main:'main2'}];
            if (path == '/home/recommend') {
                info = [{head:'head1'}, {main:'main1'}];
            }
            this.info[path] = info;
        }
    },
    //更新路由时修改path
    beforeRouteUpdate (to, from, next) {
        this.path = to.path;
        next();
    }
}
</script>

<style lang="scss" scoped>
    /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .homeMain {
        height: calc(100% - 30px);
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
                    margin-bottom: 40px;
                    &:last-child {
                    margin-bottom: 0;
                    }
                }
                .el-col {
                    border-radius: 4px;
                }
                .bg-purple {
                    background: #d3dce6;
                }
                .grid-content {
                    border-radius: 4px;
                    height: 250px;
                }
            }
        }
    }
</style>
