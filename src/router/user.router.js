//添加用户
const Router = require('koa-router')
const useRouter = new Router({ prefix: '/users' })
const { create,avatorInfo } = require('../controller/user.controller')
const {verifyUser,handlePassword}=require('../middleware/user.middleware')
//useRouter.post(路径,中间件函数,请求处理函数)
//中间件函数用于在请求处理函数之前执行的函数，可以是一个或多个函数
useRouter.post('/', verifyUser, handlePassword, create)
//获取头像信息
useRouter.get('/:userId/avatar', avatorInfo)
module.exports=useRouter