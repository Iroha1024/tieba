const db = require('../db.js');

class User {
    constructor(user_id, user_name, user_img) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_img = user_img;
        this.ba_follow_list = [];
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

    //查询用户，若没有关注列表，则重新查询
    static selectUserByLoginName(login_name) {
        return db('user')
                .join('user_ba', 'user.user_id', '=', 'user_ba.user_id')
                .join('ba', 'ba.ba_id', '=', 'user_ba.ba_id')
                .where('user.login_name', login_name)
                .select()
                .then(u => {
                    var arr = u[0];
                    if (!arr) return;
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
                    return Promise.reject(user);
                })
                .then(() => {
                    return db('user')
                        .where('user.login_name', login_name)
                        .select()
                        .then(u => {
                            u = u[0];
                            if (!u) return;
                            var user = new User(
                                u.user_id,
                                u.user_name,
                                u.user_img,
                            );
                            return user;
                        })
                })
                .catch(user => {
                    return user;
                })
    }     
    
    //检测用户名是否重名
    static checkLoginName(login_name) {
        return db('user')
                .where('user.login_name', login_name)
                .select()
                .then(u => !!u[0])
    }

    //插入注册用户
    static insertUser(login_name ,password) {
        let user = {
            user_id : null, 
            login_name,
            password,
            user_name: login_name, 
            user_img:  null,
        }
        return db('user').insert(user)
    }

}

module.exports = User;
