const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
const momentRouter = require('../router/moment.router')
const commentRouter = require('../router/comment.router')
const fileRouter = require('../router/file.router')

const app = new Koa()

app.use(bodyParser())
// app.use((ctx,next)=>{console.log(ctx.request.body)})
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())
app.use(momentRouter.routes())
app.use(momentRouter.allowedMethods())
app.use(commentRouter.routes())
app.use(commentRouter.allowedMethods())
app.use(fileRouter.routes())
app.use(fileRouter.allowedMethods())

app.on('error',(error,ctx)=>{
    console.log(error.message)
    switch (error.message){
        case '用户名或密码不可为空！':
            ctx.status = 400
            ctx.body = error.message
            break;
        case '用户名已存在！':
            ctx.status = 409
            ctx.body = error.message
            break
        case '用户名不存在！':
            ctx.status = 400
            ctx.body = error.message
            break
        case '密码错误！':
            ctx.status = 400
            ctx.body = error.message
            break
        case 'token验证失败':
            ctx.status = 401
            ctx.body = error.message
            break
        case '没有权限！':
            ctx.status = 401
            ctx.body = error.message
            break
        default:
            ctx.status = 404
            ctx.body = '发生了错误！'
    }
})

module.exports = app