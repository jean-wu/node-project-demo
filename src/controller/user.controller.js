const fs=require('fs')
const { create, getAvatarById } = require('../service/user.service')
class UserController{
  async create(ctx, next) {
    //发送请求
    const result= await create(ctx.request.body)
    ctx.body = result
  }
  async avatorInfo(ctx, next) { 
    //获取图像信息
    const {userId}=ctx.params
    const result = await getAvatarById(userId)
    //提供图像信息
    ctx.response.set('content-type',result.mimetype)
    ctx.body = fs.createReadStream(`./uploads/avatar/${result.filename}`)
  }
}
module.exports=new UserController()