const express = require('express');
const router = express.Router();

const Article = require('../models/article');

router.get('/article/:user_id', (req, res) =>{
    const user_id = req.params.user_id;
    Article.selectArticles(user_id).then(articles => {
        res.send({ articles })
    })
})

module.exports = router;