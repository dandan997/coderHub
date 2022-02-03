const connection = require('../app/database')

class CommentService{
    async create(momentId,content,userId){
        const statement = `insert into comment(content,moment_id,user_id) values(?,?,?);`
        try {
            const result = await connection.execute(statement,[content,momentId,userId])
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
        }
        // return result
    }
    async reply(momentId,content,userId,commentId){
        const statement = `insert into comment(content,moment_id,user_id,comment_id) values(?,?,?,?);`
        const result = await connection.execute(statement,[content,momentId,userId,commentId])
        console.log(content,momentId,userId,commentId)
        return result
    }
}

module.exports = new CommentService()