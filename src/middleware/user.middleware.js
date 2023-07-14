const { NAME_OR_PASSWORD_IS_REQUIRED,USER_ALREADY_EXISTS } = require('../constants/err.types')
const serve = require('../service/user.service')
const md5password=require('../utils/password.handle')
const verifyUser = async (ctx, next) => {
  //获取用户信息
  const { name, password } = ctx.request.body
  //验证用户名密码是否为空
  if (!name || !password || name === '' || password === '') { 
    const err=new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error',err,ctx)
  }
  //验证是否用户存在
  let result = await serve.getUserByName(ctx.request.body)
  if (result.length > 0) {
    const err=new Error(USER_ALREADY_EXISTS)
    return ctx.app.emit('error',err,ctx)
  }
  await next()
}
const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  //执行加密
  ctx.request.body.password = md5password(password)
  await next()
}
module.exports={verifyUser,handlePassword}