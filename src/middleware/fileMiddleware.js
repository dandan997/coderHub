const multer = require('koa-multer')
const {createAvatar,getAvatarById} = require('../service/file.service')
const fs = require('fs')

const storage = multer.diskStorage({
    destination:'./uploads/avatar',filename:(ctx,file,cb)=>{
        cb(null,file.originalname)
    }})

const avatarUpload = multer({
    storage
})

const avatarHandle = avatarUpload.single('avatar')

const saveAvatarInfo = async (ctx,next)=>{
    //获取图像相关的信息
    const {mimetype,filename,size} = ctx.req.file
    const {id} = ctx.user
    //将数据保存到数据库中
    const result = await createAvatar(filename,mimetype,size,id)
    // console.log('saveAvatarInfo',result)
    ctx.body = result
}
//获取头像信息
const avatarInfo = async(ctx,next)=>{
    const {userId} = ctx.params
    const result = await getAvatarById(userId)
    // console.log(result)
    //提供图像信息
    ctx.response.set('content-type',result.mimetype)
    ctx.body = fs.createReadStream(`./uploads/avatar/${result.filename}`)
}
//处理图像，将图像存储成三个大小的文件
const pictureResize = async(ctx,next)=>{
    console.log('图片处理中')
    await next()
}

module.exports = {avatarHandle,saveAvatarInfo,avatarInfo,pictureResize}