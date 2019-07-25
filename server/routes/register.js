const express = require('express');
const router = express.Router();

const User = require('../models/user');

//注册检测
router.get('/checkName/:name', (req, res) => {
    const name = req.params.name;
    User.checkLoginName(name).then(result => {
        res.send({ existed: result });
    })
})

//注册
router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Promise.all([User.insertUser(username, password), User.selectUserByLoginName(username)])
        .then(([user_id, user]) => {
            res.send({ success: true, user })
        })
})

module.exports = router;