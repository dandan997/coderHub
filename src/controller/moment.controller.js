const context = require('koa/lib/context')
const momentService = require('../service/moment.service')
const {getMomentById,getMomentList,update,remove} = require('../service/moment.service')

class MommentController{
    async create(ctx,next){
        //获取数据
        const userId = ctx.user.id
        const content = ctx.request.body.content
        ctx.body = '发表动态成功'

        //将数据存入数据库
        const result = await momentService.create(userId,content)
        console.log(result)
        ctx.body = result
    }
    async momentDetail(ctx,next){
        //获取数据
        const momentId = ctx.params.momentId
        // console.log(momentId)
        const result = await getMomentById(momentId)
        ctx.body = result
    }
    async getMomentList(ctx,next){
        const {offset,size} = ctx.query
        
        const result = await getMomentList(offset,size)
        ctx.body = result
    }
    async update(ctx,next){
        const {momentId} = ctx.params
        const {content} = ctx.request.body
        // const id = ctx.user.id
        const result = await update(content,momentId)
        // console.log(result,'update结果')
        // console.log(ctx.params.momentId,ctx.request.body.content,ctx.user.id)
        ctx.body = '修改内容成功'
    }
    async remove(ctx,next){
        const {momentId} = ctx.params
        
        const result = await remove(momentId)
        ctx.body = result
    }
}

module.exports = new MommentController()