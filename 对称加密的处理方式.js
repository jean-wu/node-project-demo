const jwt = require("jsonwebtoken");
const SECREAT_KEY = "aaabbb";
const Router = require("koa-router");
const authRouter = new Router();
authRouter.get("/login", (ctx, next) => {
	//假设这是获取的用户信息
	const user = { id: 123, name: "lisa" };
	try {
		//加密生成token，jwt.sign(携带的参数，secretkey,其他参数)
		const token = jwt.sign(user, SECREAT_KEY, {
			expiresIn: 10, //过期时间，单位为秒
		});
		//向前端发送加密的token
		ctx.body = `欢迎回来！${token}`;
	} catch (err) {
		console.log(err.message);
	}
});
//先在apifox中，在请求接口头部添加/login中获取的token
authRouter.get("/demo", (ctx, next) => {
	const SECREAT_KEY = "aaabbb";
	const authorization = ctx.request.header.authorization;
	const token = authorization.replace("Bearer ", "");
	try {
		//验证签名,解密
		const result = jwt.verify(token, SECREAT_KEY);
		//返回解密后的结果
		ctx.body = result;
	} catch (err) {
		console.log(err.message);
	}
});
