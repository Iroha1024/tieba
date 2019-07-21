const db = require('../db.js');

class User {
    constructor(user_id, user_name, user_img) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_img = user_img;
        this.ba_follow_list = [];
    }

    static selectUserByUserId(user_id) {
        return db('user')
                .join('user_ba', 'user.user_id', '=', 'user_ba.user_id')
                .join('ba', 'ba.ba_id', '=', 'user_ba.ba_id')
                .where('user.user_id', user_id)
                .select()
                .then(u => {
                    var arr = u[0];
                    var user = new User(
                        arr.user_id,
                        arr.user_name,
                        arr.user_img,
                    );
                    u.forEach(item => {
                        user.ba_follow_list.push({
                            ba_id: item.ba_id,
                            ba_name: item.ba_name,
                            ba_url: item.ba_url,
                        })
                    })
                    return user;
                })
    }

    static selectUserByAId(a_id) {
        return db('user')
                .join('article', 'user.user_id', '=', 'article.user_id')
                .where('article.a_id', a_id)
                .select()
                .then(u => {
                    u = u[0];
                    var user = new User(
                        u.user_id,
                        u.user_name,
                        u.user_img,
                    )
                    return user;
                })
    }

    //验证密码
    static checkPassword(login_name, password) {
        return db('user')
                .where('user.login_name', login_name)
                .select()
                .then(u => {
                    u = u[0];
                    if (!u) return false;
                    return password === u.password;
                })
    }

    static selectUserByLoginName(login_name) {
        return db('user')
                .where('user.login_name', login_name)
                .select()
                .then(u => {
                    u = u[0];
                    var user = new User(
                        u.user_id,
                        u.user_name,
                        u.user_img,
                    )
                    return user;
                })
    }           
}

module.exports = User;
