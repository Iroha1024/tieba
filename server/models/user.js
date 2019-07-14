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
                        })
                    })
                    return user;
                })
    }
}

// User.selectUserByUserId(8).then(user => {
//     console.log(user);
// })

module.exports = User;
