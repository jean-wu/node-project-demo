const path=require('path')
const Multer = require('koa-multer')
const Jimp=require('jimp')
const avatarUpload=Multer({
  dest:'./uploads/avatar'
})
const avatarHandle = avatarUpload.single('avatar')
const pictureUpload = Multer({
  dest:'./uploads/picture'
})
const pictureHandle = pictureUpload.array('picture', 9)
//重新计算图片大小
const pictureResize = async (ctx,next) => {
  //1.获取所有的图像信息
  const files = ctx.req.files
  //2.对图像进行处理（ship/jimp库）
  
  for (let file of files) {
    const destPath=path.join(file.destination,file.filename)
    Jimp.read(file.path).then(image => {
      //宽度1280，高度自动，写入到指定文件
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
      image.resize(320,Jimp.AUTO).write(`${destPath}-small`)
    })
  }
  await next()
}
module.exports = { avatarHandle,pictureHandle,pictureResize }