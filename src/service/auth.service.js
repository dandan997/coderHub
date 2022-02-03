const connection = require('../app/database')

class AuthService{
    async checkResource(id,user_id,resourseType){
        const statement = `select * from ${resourseType} where id = ? and user_id = ?;`
        console.log(statement)
        const result = await connection.execute(statement,[id,user_id])
        console.log(result)
        // @ts-ignore
        if(result[0].length===0){
            // console.log(result)
            return false
        }else{
            return true
        }
    }
}

module.exports = new AuthService()