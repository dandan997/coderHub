const connection = require('../app/database')

const createAvatar = async(filename,mimetype,size,userId)=>{
    const statement = `insert into avatar (filename,mimetype,size,user_id) values(?,?,?,?);`
    const result = await connection.execute(statement,[filename,mimetype,size,userId])
    return result[0]
}
//根据id获取头像地址
const  getAvatarById = async(id)=>{
    const statement = `select * from avatar where user_id=?;`
    const result = await connection.execute(statement,[id])
    return result[0][0]
}

module.exports = {createAvatar,getAvatarById}