//发表评论
const Router = require('koa-router')
const commentRouter = new Router({ prefix: '/comment' })
const { verifyAuth,veriyPermission } = require('../middleware/auth.middleware')
const { create,replay,update,remove,list } = require('../controller/comment.controller')
//发表评论
commentRouter.post('/', verifyAuth, create)
//回复评论
commentRouter.post('/:commentId/replay', verifyAuth, replay)
//修改评论
commentRouter.patch('/:commentId', verifyAuth,veriyPermission, update)
//删除评论
commentRouter.delete('/:commentId', verifyAuth, veriyPermission, remove)
//获取评论
commentRouter.get('/',list)
module.exports=commentRouter