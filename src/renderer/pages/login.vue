<template>
    <div class="login">
        <div class="info">
            <div class="username">
                <label for="username" class="text">用户名</label>
                <input type="text" id="username" class="input" autofocus="autofocus" maxlength="15" 
                    @blur="check($event.currentTarget)" pattern="^[\w_-]{4,16}$" data-msg="4到16位（字母，数字，下划线，减号）">
                <div class="warning">
                    <p class="tips"></p>
                </div>
            </div>
            <div class="password">
                <label for="password" class="text">密码</label>
                <input type="password" id="password" class="input" maxlength="20" @blur="check($event.currentTarget)"
                    pattern="^[\w]{6,20}$" data-msg="6到20位（字母，数字）">
                <div class="warning">
                    <p class="tips"></p>
                </div>
            </div>
            <div class="button-area">
                <div class="button" id="submit" @click="submit">登录</div>
                <div class="button">注册</div>
            </div>
        </div>
    </div>
</template>

<script>
import animateCSS from '../utils/animateCSS';
export default {
    data() {
        return {
            nullMsg: '输入为空！！！',
        }
    },
    methods: {
        //检查是否符合正则
        check(input) {
            let pattern = RegExp(input.pattern);
            let msgNode = input.parentNode.getElementsByTagName('p')[0];
            if (!input.value) {
                msgNode.style.display = 'block';
                msgNode.innerText = this.nullMsg;
                return;
            }
            if(pattern.test(input.value)) {
                msgNode.style.display = 'none';
            } else {
                msgNode.style.display = 'block';
                msgNode.innerText = input.getAttribute('data-msg');
            }
        },
        submit() {
            let username = document.getElementById('username');
            let password = document.getElementById('password');
            let arr = [username, password];
            //所有报错消失时，才允许登录
            let judge = arr.every(input => {
                let msgNode = input.parentNode.getElementsByTagName('p')[0];
                return msgNode.style.display === 'none';
            })
            if (judge) {
                this.$http.post(this.api + '/public/login', {
                    username: username.value,
                    password: password.value,
                })
                .then((result) => {
                    //用户名或密码错误
                    if (!result.data.success) {
                        animateCSS('#submit', 'swing');
                        this.sendErrorMsg();
                    } else {
                        let user = result.data.user;
                        this.$store.dispatch('initUser', {
                            user
                        });
                        console.log(this.$store.state.user);
                        this.$router.push('/home');
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        sendErrorMsg() {
            this.$notify.error({
                title: '错误',
                message: '用户名或密码错误！！！',
                duration: 2000
            });
        }
    },
}
</script>

<style lang="scss" scoped>
    .warning {
        height: 20px;
        padding: 10px 0;
        .tips {
            color: #eb1f1f;
            font-size: 20px;
            line-height: 20px;
            white-space: nowrap;
        }
    }
    .login {
        width: 100%;
        height: 100%;
        background: url('../assets/img/login_bg.png') no-repeat;
        background-size: cover;
        .info {
            width: 300px;
            height: 400px;
            margin: 0 100px 0 auto;
            padding: 10%;
            font-size: 25px;
            .text {
                display: block;
                padding-bottom: 10px;
            }
            .input {
                border-radius: 5px;
                width: calc(100% - 20px);
                font-size: 20px;
                height: 30px;
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.12);
            }
            .input:focus {
                border-color: #2188ff;
                box-shadow: inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3);
            }
            .button-area {
                padding: 40px 10px;
                display: flex;
                justify-content: space-around;
                .button {
                    padding: 10px 20px;
                    cursor: pointer;
                    border-radius: 10px;
                    background: rgba(123, 225, 255, 0.46);
                }
            }
        }
    }
</style>
