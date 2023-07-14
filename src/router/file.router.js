const Router = require('koa-router')
const fileRouter = new Router({ prefix: '/upload' })
const {avatarHandle,pictureHandle,pictureResize}=require('../middleware/file.middleware')
const { verifyAuth } = require('../middleware/auth.middleware')
const { saveAvatarInfo,savePictureInfo } = require('../controller/file.controller')
//上传头像
fileRouter.post('/avatar', verifyAuth, avatarHandle, saveAvatarInfo)
//上传图片
fileRouter.post('/picture', verifyAuth, pictureHandle,pictureResize, savePictureInfo)
module.exports=fileRouter