const jwt = require('jsonwebtoken')
const {PUBLIC_KEY} = require('../app/config')
const {checkResource} = require('../service/auth.service')

const  verifyAuth = async(ctx,next)=>{
    // console.log('验证授权的中间件')
    //获取token
    const authorization = ctx.headers.authorization
    // console.log(authorization)
    const token = authorization.replace('Bearer ','')
    //验证token
    try {
        const result = jwt.verify(token,PUBLIC_KEY,{
            algorithms:['RS256']
        })
        ctx.user = result
        console.log('token验证成功')
        // console.log(result)
        await next()
    } catch (err) {
        const error = new Error('token验证失败')
        ctx.app.emit('error',error,ctx)
    }
}

const verifyPermission = async (ctx,next)=>{
    // const momentId = ctx.params.momentId
    const user_id = ctx.user.id
    
    const key = Object.keys(ctx.params)[0]
    // console.log(key)
    // console.log(momentId,id)
    const id = +ctx.params[key]
    // console.log(id)
    const resourseType = Object.keys(ctx.params)[0].replace('Id','')
    const isPermission = await checkResource(id,user_id,resourseType)
    console.log(id,user_id,resourseType)
    if(!isPermission){
        const error = new Error('没有权限！')
        return ctx.app.emit('error',error,ctx)
    }
    console.log('验证权限的中间件')
    await next()
}

module.exports = {verifyAuth,verifyPermission}