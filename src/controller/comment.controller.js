const {create,reply} = require('../service/comment.service')

class CommentController{
    async create(ctx,next){
        const {momentId,content} = ctx.request.body
        const userId = ctx.user.id
        const result = await create(momentId,content,userId)
        ctx.body = result
    }
    async reply(ctx,next){
        const {momentId,content,commentId} = ctx.request.body
        const userId = ctx.user.id
        const result = await reply(momentId,content,userId,commentId)
        ctx.body = result
    }
    async remove(ctx,next){
        ctx.body = '已经删除'
    }
}

module.exports = new CommentController()