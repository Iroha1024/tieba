const express = require('express');
const router = express.Router();

const User = require('../models/user');

//登录
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //匹配失败，直接返回信息。成功，附加用户
    User.checkPassword(username, password).then(result => {
        return { result,username };
    })
    .then(({ result, username }) => {
        if (!result) {
            res.send({ success: result });
            return Promise.reject();
        }
        return Promise.all([User.selectUserByLoginName(username), Promise.resolve(result)])
    })
    .then(([ user, result ]) => {
        res.send({ success: result, user });
    })
    .catch(e => {
        console.log('用户名或密码错误');
    })
})

//注册检测
router.get('/register/checkName/:name', (req, res) => {
    const name = req.params.name;
    User.checkLoginName(name).then(result => {
        res.send({ existed: result });
    })
})

module.exports = router;