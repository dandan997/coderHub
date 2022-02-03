const service = require('../service/user.service')
const {md5password} = require('../utils/password-handle')

const verifyUser = async (ctx,next)=>{
    const {password,name} = ctx.request.body

    //判断密码用户名都不为空
    if(!name||!password){
        const error = new Error('用户名或密码不可为空！')
        
        return ctx.app.emit('error',error,ctx)
    }


    //判断没有重复的用户名
    const result = await service.getUserByName(name)
    // console.log(result[0].length)
    // @ts-ignore
    if(result[0].length){
        const error = new Error('用户名已存在！')
        return ctx.app.emit('error',error,ctx)
    }

    await next()
}

const handlePassword =async (ctx,next)=>{
    let {password} = ctx.request.body
    password = md5password(password)
    ctx.request.body.password = password
    await next()
}

module.exports = {verifyUser,handlePassword}