//发布动态
const Router = require("koa-router");
const momentRouter = new Router({ prefix: "/moment" });
const {
	verifyAuth,
	veriyPermission,
} = require("../middleware/auth.middleware");
const {
	create,
	detail,
	list,
	update,
	remove,
	addLabels,
	fileInfo
} = require("../controller/moment.controller");
const { verifyLabelExist } = require("../middleware/label.middleware");
//插入动态
momentRouter.post("/", verifyAuth, create);
//查询单条动态
momentRouter.get("/:momentId", detail);
//查询多条动态
momentRouter.get("/", list);
//修改动态
//1.用户必须登录
//2.只能修改自己的动态
momentRouter.patch("/:momentId", verifyAuth, veriyPermission, update);
//删除动态
momentRouter.delete("/:momentId", verifyAuth, veriyPermission, remove);
//给动态增加标签
momentRouter.post(
	"/:momentId/labels",
	verifyAuth,
	veriyPermission,
	verifyLabelExist,
	addLabels
);
//动态配图的服务(在获取单条/多条动态的时候调用，对图片进行转化)
momentRouter.get("/images/:filename", fileInfo);
module.exports = momentRouter;
