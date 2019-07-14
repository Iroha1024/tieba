<template>
    <div class="article">
        <el-scrollbar style="height: 100%">
            <el-container>
                <el-header>
                    <i class="el-icon-back back" @click="back"></i>
                </el-header>
                <el-main>
                    
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
        }
    },
    mounted() {
        this.aid = this.$route.params.aid;
        console.log('mounted');
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    },
}
</script>

<style lang="scss" scoped>
    .article {
        height: 100%;
    }
    .el-header {
        box-shadow: 0px 5px 5px #a7a5a5;
    }
    .back {
        font-size: 50px;
    }
    .back:hover {
        background: #3dd2ec;
        cursor: pointer;
        border-radius: 25px;
    }
</style>
