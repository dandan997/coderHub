const Router = require('koa-router')

const {create} = require('../controller/user.controller')
const {verifyUser,handlePassword} = require('../middleware/userMiddleware')

const userRouter = new Router({prefix:'/user'})

userRouter.post('/',verifyUser,handlePassword,create)

module.exports = userRouter