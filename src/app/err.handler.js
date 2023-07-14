const {
	NAME_OR_PASSWORD_IS_REQUIRED,
	USER_ALREADY_EXISTS,
	USER_DOES_NOT_EXISTS,
	PASSWORD_IS_INCORRENT,
	UNAUTHORIZATION,
	UNPRESSION
} = require("../constants/err.types");
const errHandler = (err, ctx) => {
	let message, status;
	switch (err.message) {
		case NAME_OR_PASSWORD_IS_REQUIRED:
			status = 400;
			message = "用户名或密码不能为空~";
			break;
		case USER_ALREADY_EXISTS:
			status = 409;
			message = "用户已经存在!";
			break;
		case USER_DOES_NOT_EXISTS:
			status = 400;
			message = "用户不存在!";
			break;
		case PASSWORD_IS_INCORRENT:
			status = 400;
			message = "密码不正确！";
      break;
      case UNAUTHORIZATION:
        status = 401;
        message = "无效的token！";
			break;
			case UNPRESSION:
        status = 401;
        message = "没有操作的权限！";
			break;
			
		default:
			status = 404;
			message = "发生错误了";
	}

	ctx.body = message;
	ctx.status = status;
};
module.exports = errHandler;
