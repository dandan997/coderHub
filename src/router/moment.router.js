const Router = require('koa-router')
const { verifyAuth,verifyPermission } = require('../middleware/authMiddleware')
const { create,momentDetail,getMomentList,update,remove } = require('../controller/moment.controller')

const momentRouter = new Router({prefix:'/moment'})

momentRouter.post('/',verifyAuth,create)
momentRouter.get('/:momentId',momentDetail)
momentRouter.get('/',getMomentList)
//修改moment内容
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)
//删除moment内容
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove)

module.exports = momentRouter