const db = require('../db.js');

class Article {
    constructor(a_id, user_id, ba_id, title, content) {
        this.a_id = a_id;
        this.user_id = user_id;
        this.ba_id = ba_id;
        this.title = title;
        this.content = content;
        let img = this.content.match(/\[(.+?)\]/g) ? this.content.match(/\[(.+?)\]/g)[0] : '';
        this.img = img ? img.substring(1, img.length - 1) : '';
    }

    //根据aid查询文章
    static selectArticleByAId(a_id) {
        return db('article')
                .where('a_id', a_id)
                .then(a => {
                    a = a[0];
                    var article = new Article(
                        a.a_id,
                        a.user_id,
                        a.ba_id,
                        a.title,
                        a.content,
                    )
                    return article;
                })
    }

    //根据吧url查询文章
    static selectArticlesByBaUrl(ba_url) {
        let articles_list = [];
        return db('article')
                .join('ba', 'ba.ba_id', '=', 'article.ba_id')
                .where('ba.ba_url', ba_url)
                .select()
                .then(a => {
                    a.forEach(item => {
                        let article = new Article(
                            item.a_id,
                            item.user_id,
                            item.ba_id,
                            item.title,
                            item.content,
                        )
                        articles_list.push(article);
                    })
                    // console.log(articles_list);
                    return articles_list;
                })
    }

    //调整成发送给home的格式
    static formatArticles(articles_list) {
        let articles = {
            head: [{
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
                },],
            main: []
        }
        articles.main = articles_list;
        return articles;
    }
}

module.exports = Article;
