<template>
    <div class="">
        <div class="grid-content">
            <el-image :src="article.imgUrl" fit="cover" lazy>
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <div class="word">
                <div class="title">{{ article.title }}</div>
                <div class="content">{{ article.content }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        article: ''
    },
}
</script>

<style lang="scss" scoped>
    .grid-content {
        position: relative;
        height: 280px;
        background: #d3dce6;
        overflow: hidden;
        .el-image {
            height: 100%;
            width: 100%;
            position: relative;
        }
        .el-image::before {
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
