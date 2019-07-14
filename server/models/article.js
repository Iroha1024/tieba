const db = require('../db.js');

class Article {
    constructor(a_id, user_id, ba_id, title, content) {
        this.a_id = a_id;
        this.user_id = user_id;
        this.ba_id = ba_id;
        this.title = title;
        this.content = content;
        this.img = this.content.match(/\[(.+?)\]/g) ? this.content.match(/\[(.+?)\]/g)[0] : null;
    }

    static selectArticleByAId(a_id) {
        return db('article').where('a_id', a_id).then(a => {
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

    static selectByBaId(ba_id) {

    }
}

// Article.selectArticleByAId(1).then(a => {
//     console.log(a);
// })

module.exports = Article;
