const Router = require('koa-router')

const { login,loginVerify,success } = require('../controller/auth.controller')
const { verifyAuth } = require('../middleware/authMiddleware')

const authRouter = new Router({prefix:'/'})

authRouter.post('login',loginVerify,login)
authRouter.get('test',verifyAuth,success)

module.exports = authRouter