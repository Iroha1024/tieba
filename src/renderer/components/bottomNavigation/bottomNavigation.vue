<template>
    <div id="bottom-nav">
        <router-link to="/home" tag="div" class="iconfont">&#xe600;</router-link>
        <router-link to="/follow" tag="div" class="iconfont">&#xe607;</router-link>
        <router-link to="/message" tag="div" class="iconfont">&#xe60d;</router-link>
        <router-link to="/info" tag="div" class="iconfont">&#xe608;</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    #bottom-nav {
            position: absolute;
            bottom: 0;
            margin-bottom: 10px;
            width: 100%;
        div {
            float: left;
            width: 25%;
            text-align: center;
            font-size: 25px;
        }
    }
        
</style>
