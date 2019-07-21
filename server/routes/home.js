const express = require('express');
const router = express.Router();

const Article = require('../models/article');
const User = require('../models/user');
const Reply = require('../models/reply');

//根据用户id，返回user
router.get('/', (req, res) => {
    const user_id = req.query.user_id;
    User.selectUserByUserId(user_id).then(user => {
        res.send({user});
    })
})

//根据吧url，返回主页对应接收格式
router.get('/:ba_url', (req, res) => {
    const ba_url = req.params.ba_url;
    Article.selectArticlesByBaUrl(ba_url).then(articles => {
        articles = Article.formatArticles(articles);
        res.send({ articles});
    })
})

//根据a_id，返回user、article
router.get('/article/:a_id', (req, res) => {
    const a_id = req.params.a_id;
    Promise.all([User.selectUserByAId(a_id), Article.selectArticleByAId(a_id)])
    .then(result => {
        res.send({ user: result[0], article: result[1] });
    })
})

//根据a_id，返回reply
router.get('/reply/:a_id', (req, res) => {
    const a_id = req.params.a_id;
    Reply.selectRepliesByAId(a_id).then(replies => {
        res.send({ replies });
    })
})

//插入回复
router.post('/reply',(req, res) => {
    const reply = req.body.reply;
    Reply.insertReply(reply).then(() => {
        res.send({ success: true })
    })
})

//根据a_id，返回最大楼层id
router.get('/reply/floorId/:a_id', (req, res) => {
    const a_id = req.params.a_id;
    Reply.selectMaxFloorId(a_id).then(reply => {
        let floor_id = reply[0].id;
        if (!floor_id) {
            floor_id = 1;
        }
        res.send({ floor_id })
    })
})

module.exports = router;