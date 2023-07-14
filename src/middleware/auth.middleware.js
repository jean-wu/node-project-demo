const jwt = require("jsonwebtoken");
const {
	NAME_OR_PASSWORD_IS_REQUIRED,
	USER_DOES_NOT_EXISTS,
	PASSWORD_IS_INCORRENT,
	UNAUTHORIZATION,
	UNPRESSION,
} = require("../constants/err.types");
const { PUBLICE_KEY } = require("../app/config");
const md5password = require("../utils/password.handle");
const serve = require("../service/user.service");
const { checkResource } = require("../service/auth.service");
//验证登录
const verifyLogin = async (ctx, next) => {
	//1.获取账号密码
	let { name, password } = ctx.request.body;
	//2.验证用户名密码是否为空
	if (!name || !password || name === "" || password === "") {
		const err = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
		return ctx.app.emit("error", err, ctx);
	}
	//3.验证是否用户存在
	let user = await serve.getUserByName(ctx.request.body);
	if (!user[0]) {
		const err = new Error(USER_DOES_NOT_EXISTS);

		return ctx.app.emit("error", err, ctx);
	}
	//4.验证账号密码是否正确
	if (md5password(password) !== user[0].password) {
		const err = new Error(PASSWORD_IS_INCORRENT);

		return ctx.app.emit("error", err, ctx);
	}
	ctx.user = user[0];
	await next();
};
//验证token
const verifyAuth = async (ctx, next) => {
	try {
		const authorization = ctx.request.header.authorization;
		if (!authorization) {
			const error = new Error(UNAUTHORIZATION);
			return ctx.app.emit("error", error, ctx);
		}
		const token = authorization.replace("Bearer ", "");
		//验证签名（解密）
		const result = jwt.verify(token, PUBLICE_KEY, {
			algorithms: ["RS256"],
		});
		ctx.user = result;
		await next();
	} catch (err) {
		const error = new Error(UNAUTHORIZATION);
		ctx.app.emit("error", error, ctx);
	}
};
//查询操作是否具备权限
const veriyPermission = async (ctx, next) => {
		const [resourceKey] = Object.keys(ctx.params);
		const tableName = resourceKey.replace("Id", "");
		const resourceId = ctx.params[resourceKey];
	const { id } = ctx.user;
		const isPerssion = await checkResource(resourceId, id, tableName);
		if (!isPerssion) {
			const error = new Error(UNPRESSION);
			ctx.app.emit("error", error, ctx);
			return;
		}
		await next();
};
module.exports = { verifyLogin, verifyAuth, veriyPermission };
