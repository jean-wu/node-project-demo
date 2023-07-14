const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const errHandler = require('./err.handler')
const useRoutes=require('../router/index')
app.use(bodyparser())
useRoutes(app)
app.on('error',errHandler)
module.exports=app