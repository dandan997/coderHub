const Router = require('koa-router')

const { verifyAuth,verifyPermission } = require('../middleware/authMiddleware')
const { create,reply,remove } = require('../controller/comment.controller')


const commentRouter = new Router({prefix:'/comment'})

commentRouter.post('/',verifyAuth,create)
commentRouter.post('/reply',verifyAuth,reply)
commentRouter.delete('/:commentId',verifyAuth,verifyPermission,remove)

module.exports = commentRouter