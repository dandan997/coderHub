const Router = require('koa-router')
const { verifyAuth } = require('../middleware/authMiddleware')
const {avatarHandle,saveAvatarInfo,avatarInfo,pictureResize} = require('../middleware/fileMiddleware')



const fileRouter = new Router({prefix:'/upload'})

fileRouter.post('/avatar',verifyAuth,avatarHandle,pictureResize,saveAvatarInfo)
fileRouter.get('/avatar/:userId',avatarInfo)

module.exports = fileRouter