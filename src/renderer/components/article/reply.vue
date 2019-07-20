<template>
    <div class="reply" v-if="Boolean(reply.is_owner)">
        <div class="user">
            <div class="head-img">
                <img v-lazy="reply.user_img">
            </div>
            <div class="user-name">{{ reply.user_name }}</div>
        </div>
        <div class="content">
            <div v-html="reply.content"></div>
            <el-collapse-transition>
                <div class="floor-reply" v-show="isActivated">
                    <div class="floor-reply-item" v-for="(floor_reply, key) of floorReplies" :key="key" 
                        v-if="reply.floor_id == floor_reply.floor_id">
                        <div class="floor-head-img">
                            <img v-lazy="floor_reply.user_img">
                        </div>
                        <div class="floor-user-name" :title="floor_reply.user_name">{{ floor_reply.user_name }}</div>
                        <div class="floor-content">{{ floor_reply.content }}</div>
                    </div>
                    <div class="my-reply">
                        <div class="text floor-reply-div" contenteditable="true"></div>
                        <el-button 
                            type="primary" 
                            icon="el-icon-upload" 
                            :data-index="index"
                            @click="submit($event.currentTarget)">
                                发表
                        </el-button>
                    </div>
                </div>
            </el-collapse-transition>
            <div class="floor-info">
                <div class="floor-reply-button" @click="toggleFloorReply($event.currentTarget)">
                    回复
                </div>
                <div class="floor-id">{{ reply.floor_id }}楼</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActivated: false
        }
    },
    props: {
        reply: {},
        floorReplies: Array,
        index: Number
    },
    methods: {
        //点击回复，切换楼层回复框
        toggleFloorReply(div) {
            this.isActivated = !this.isActivated;
            div.innerHTML = this.isActivated ? '收起回复' : '回复'
        },
        //提交回复
        submit(button) {
            let index = button.getAttribute('data-index');
            let div = document.getElementsByClassName('floor-reply-div')[index];
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
                a_id: null,
                user_id: 8,
                floor_id: Number(index) + 2,
                content: text,
                is_owner: 0,
                target: null
            }
            this.$emit('submitReply', reply);
            // console.log(text);
            div.innerText = '';
        }
    }
}
</script>

<style lang="scss" scoped>
    .reply {
        width: 100%;
        display: inline-flex;
        border: 1px solid #d7d7d7;
        box-sizing: border-box;
        margin-bottom: 30px;
        .user {
            padding: 20px;
            width: 100px;
            font-size: 15px;
            line-height: 20px;
            text-align: center;
            .head-img {
                width: 100px;
                img {
                    width: 100%;
                }
            }
            .user-name {
                margin-top: 10px;
                word-break: break-word;
            }
        }
        .content {
            width: 100%;
            font-size: 20px;
            line-height: 25px;
            position: relative;
            word-break: break-word;
            padding: 20px 0 30px 20px;
            border-left: 1px solid #d7d7d7;
            .floor-reply {
                background: linear-gradient(rgba(255, 255, 255, 0.07), rgba(174, 174, 174, 0.62));
                padding: 20px;
                border-radius: 0 0 40px;
                .floor-reply-item {
                    display: flex;
                    padding-bottom: 20px;
                    .floor-head-img {
                        max-width: 50px;
                        img {
                            width: 100%;
                        }
                    }
                    .floor-user-name {
                        max-width: 100px;
                        width: fit-content;
                        overflow: hidden;
                        white-space: nowrap;
                        padding-left: 10px;
                    }
                    .floor-content::before {
                        content: '：'
                    }
                    .floor-content {
                        width: fit-content;
                    }
                }
                .my-reply {
                    padding: 10px 0 50px;
                    position: relative;
                    .text {
                        min-height: 80px;
                        max-height: 150px;
                        background: #fff;
                        outline: none;
                        overflow-x: hidden;
                    }
                    .el-button {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }
                }
            }
            .floor-info {
                bottom: 0;
                position: absolute;
                width: calc(100% - 20px);
                line-height: 30px;
                height: 30px;
                .floor-reply-button {
                    display: inline-block;
                }
                .floor-reply-button:hover {
                    cursor: pointer;
                    color: $icon-hover-color;
                }
                .floor-id {
                    display: inline-block;
                    right: 0;
                    position: absolute;
                    margin-right: 20px;
                }
            }
        }
    }
</style>
