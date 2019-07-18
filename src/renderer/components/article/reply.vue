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
            <div :class="{'floor-reply': isActivated}">
                <div class="floor-reply-item" v-for="(floor_reply, key) of floorReplies" :key="key" 
                    v-if="hasFloorReply(reply.floor_id, floor_reply.floor_id)">
                    <div class="floor-head-img">
                        <img v-lazy="floor_reply.user_img">
                    </div>
                    <div class="floor-user-name">{{ floor_reply.user_name }}</div>
                    <div class="floor-content">{{ floor_reply.content }}</div>
                </div>
            </div>
            <div class="floor-info">
                <div class="floor-id">{{ reply.floor_id }}楼</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActivated: Boolean
        }
    },
    props: {
        reply: {},
        floorReplies: Array
    },
    methods: {
        //判断楼层中是否有回复，若无则无需渲染楼层回复背景
        hasFloorReply(aid, bid) {
            this.isActivated = aid == bid;
            return aid == bid;
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
            }
            .floor-info {
                bottom: 0;
                right: 0;
                position: absolute;
                line-height: 30px;
                height: 30px;
                .floor-id {
                    margin-right: 20px;
                }
            }
        }
    }
</style>
