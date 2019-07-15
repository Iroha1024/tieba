const express = require('express');
const router = express.Router();

const Article = require('../models/article');
const User = require('../models/user');

//根据用户id，返回user
router.get('/', (req, res) => {
    const user_id = req.query.user_id;
    User.selectUserByUserId(user_id).then(user => {
        res.send({user});
    })
})

//根据吧url，返回主页对应接收格式
router.get('/:ba_url', (req, res) => {
    // const ba_url = req.path.split('/')[1];
    const ba_url = req.params.ba_url;
    Article.selectArticlesByBaUrl(ba_url).then(articles => {
        articles = Article.formatArticles(articles);
        res.send({ articles});
    })
})

//根据a_id，返回user、article
router.get('/article/:a_id', (req, res) => {
    const a_id = req.params.a_id;
    User.selectUserByAId(a_id).then(user => {
        Article.selectArticleByAId(a_id).then(article => {
            res.send({ user, article });
        })
    })
})


module.exports = router;