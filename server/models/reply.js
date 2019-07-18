const db = require('../db.js');

class Reply {
    constructor(user_name, user_img, content, floor_id, is_owner, target) {
        this.user_name = user_name;
        this.user_img = user_img;
        this.content = content;
        this.floor_id = floor_id;
        this.is_owner = is_owner;
        this.target = target;
    }

   static selectRepliesByAId(a_id) {
        let replies_list = [];
        return db('reply')
                .join('user', 'user.user_id', '=', 'reply.user_id')
                .where('reply.a_id', a_id)
                .orderBy('floor_id')
                .select()
                .then(r => {
                    r.forEach(item => {
                        let reply = new Reply(
                            item.user_name,
                            item.user_img,
                            item.content,
                            item.floor_id,
                            item.is_owner,
                            item.target,
                        )
                        replies_list.push(reply);
                    });
                    return replies_list;
                })
   }
}

module.exports = Reply;
