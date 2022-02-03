//数据库操作

const service = require('../service/user.service')

class userController{
    async create(ctx,next){
        // console.log(ctx.request.body)
        const result = await service.create(ctx.request.body)
        ctx.response.body = result
        next()
    }
    
}


module.exports = new userController()