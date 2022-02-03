const connection = require('../app/database')

class MomentService{
    async create(userId,content){
        const statement = 'INSERT INTO `moment` (content,user_id) VALUES(?,?);'
        const result = await connection.execute(statement,[content,userId])
        console.log(result)
        return result[0]
    }
    async getMomentById(momentId){
        const statement = `SELECT moment.id id,moment.content content,moment.create_at createTime,
        JSON_OBJECT('id',users.id,'name',users.name) user FROM moment LEFT JOIN users ON moment.user_id = users.id WHERE moment.id = ?;`
        const result = await connection.execute(statement,[momentId])
        console.log(result[0][0])
        return result[0][0]
    }
    async getMomentList(offset,size){
        const statement = `	SELECT moment.id id,moment.content content,moment.create_at createTime,
        JSON_OBJECT('id',users.id,'name',users.name) user FROM moment LEFT JOIN users ON moment.user_id = users.id LIMIT ?,?;`
        const result = await connection.execute(statement,[offset,size])

        return result[0]
    }
    async update(content,momentId){
        const statement = `update moment set content = ? where id = ?;`
        const result = await connection.execute(statement,[content,momentId])
        return result
    }
    async remove(momentId){
        const statement = `delete from moment where id = ?;`
        const result = await connection.execute(statement,[momentId])
        return result
    }
}
module.exports = new MomentService()