const mysql = require('mysql2')
const config = require('./config')


const connection = mysql.createPool({
	host:config.MYSQL_HOST,
	user:config.MYSQL_USER,
    // @ts-ignore
    port:config.MYSQL_PORT,
	database:config.MYSQL_DATABASE,
    password:config.MYSQL_PASSWORD
	// connextionLimit:10,
	// queueLimit:0
})

connection.getConnection((err,conn)=>{
    conn.connect((err)=>{
        if(err){
            console.log('连接服务器失败',err)
        }else{
            console.log('连接服务器成功')
        }
    })
})



module.exports = connection.promise()