const Router = require('koa-router')
const labelRouter = new Router({ prefix: '/label' })
const { create,list } = require('../controller/label.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
//增加标签
labelRouter.post('/', verifyAuth, create)
//获取标签
labelRouter.get('/', list)

module.exports=labelRouter