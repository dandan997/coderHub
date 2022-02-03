const service = require('../service/user.service')
const {md5password} = require('../utils/password-handle')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const {PRIVATE_KEY,PUBLIC_KEY} = require('../app/config')

class AuthController {
    async login(ctx, next) {
        const { name,id } = ctx.user
        // console.log(PRIVATE_KEY)
        const token = jwt.sign({id,name},PRIVATE_KEY,{
            expiresIn:60*60*24,
            algorithm:'RS256'
        })

        ctx.body = {id,name,token}
        next()
    }
    async loginVerify(ctx, next) {
        const { name, password } = ctx.request.body
        //判断用户名密码是否为空
        if (!name || !password) {
            const error = new Error('用户名或密码不可为空！')

            return ctx.app.emit('error', error, ctx)
        }
        //判断用户名是否存在
        const result = await service.getUserByName(name)
        const user = result[0][0]
        // console.log(result[0].length)
        // @ts-ignore
        if (result[0].length == 0) {
            const error = new Error('用户名不存在！')
            return ctx.app.emit('error', error, ctx)
        }
        //判断密码是否正确
        // console.log(md5password(password))
        // console.log(result[0][0].password)
        if(result[0][0].password == md5password(password)){
            ctx.user = user
            return await next()

        }else{
            const error = new Error('密码错误！')
            return ctx.app.emit('error', error, ctx)
        }
    }
    async success(ctx,next){
        ctx.body = '授权成功'
    }
}

module.exports = new AuthController()