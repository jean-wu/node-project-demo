const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
class AuthController {
	async login(ctx, next) {
		const { id, name } = ctx.user;
		/**
		 * 生成公钥和私钥
		 * 1.创建keys文件夹用于存放公钥和私钥
		 * 2.keys文件夹文件夹中打开git bash
		 * 3. 输入openssl
		 * 4.输入genrsa -out private.key 2048 生成私钥
		 * 5.输入rsa -in private.key -pubout -out public.key  根据私钥生成公钥
		 */
		const token = jwt.sign({ id, name }, PRIVATE_KEY, {
			expiresIn: 60 * 60 * 24, //过期时间为一天
			algorithm: "RS256", //采用的算法
      });
      //向客户端返回token
		ctx.body = {
			id,
			name,
			token,
		};
   }
}
module.exports = new AuthController();
