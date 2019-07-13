const express = require('express');
const router = express.Router();

//模拟数据
const articles = {
    head: [
        {
            imgUrl: 'http://p1.music.126.net/HQXdIgMd6SFjK1Q8X4ScFQ==/109951164207222744.jpg',
            url: '',
            title: 'title',
            content: 'content'
        },
        {
            imgUrl: 'http://p1.music.126.net/FokAxnzV5CJzvdhLWby2Ug==/109951164207195767.jpg',
            url: '',
            title: 'title',
            content: 'content'
        },
        {
            imgUrl: 'http://p1.music.126.net/kyPinQlberwVr53GTkHo6A==/109951164207676600.jpg',
            url: '',
            title: 'title',
            content: 'content'
        },
    ],
    main: [
        {
            imgUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            url:'',
            title: 'title',
            content: 'content'
        },
        {
            imgUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            url:'',
            title: 'title',
            content: 'content'
        },
        {
            imgUrl: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
            url:'',
            title: 'title',
            content: 'content'
        },
        {
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562830920041&di=5767c34ecc002cb02967d80847f13d6b&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Forj360%2F87e2039fly1g3zvivwovzj20ku75utu0.jpg',
            url:'',
            title: 'title',
            content: 'content'
        },
    ]
}

const articles2 = {
    head: [
        {
            imgUrl: 'http://p1.music.126.net/HQXdIgMd6SFjK1Q8X4ScFQ==/109951164207222744.jpg',
            url: '',
            title: 'title',
            content: 'content'
        }
    ],
    main: [
        {
            imgUrl: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            url: '',
            title: 'title',
            content: 'content'
        },
        {
            imgUrl: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
            url: '',
            title: 'title',
            content: 'content'
        },
        {
            imgUrl: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
            url: '',
            title: 'title',
            content: 'content'
        },
    ]
}

router.get('/recommend', (req, res) => {
    res.send({ articles: articles})
})

router.get('/programming', (req, res) => {
    res.send({ articles: articles2})
})


module.exports = router;