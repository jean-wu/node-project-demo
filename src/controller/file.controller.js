const { createAvatar,createPicture } = require("../service/file.service");
const { updateAvatarUrlById } = require("../service/user.service");
const { APP_HOST, APP_PORT } = require("../app/config");
class FileController {
	async saveAvatarInfo(ctx, next) {
		//1.获取图像相关信息
		const { mimetype, filename, size } = ctx.req.file;
		const { id } = ctx.user;
		//2.将图像数据保存到数据库中
		const result = await createAvatar(mimetype, filename, size, id);
		//3.将图片地址保存到user表中
		const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
		await updateAvatarUrlById(avatarUrl, id);
		ctx.body = "上传头像成功";
	}
	async savePictureInfo(ctx, next) {
		//1.获取图像相关信息
		const files = ctx.req.files;
		const { id } = ctx.user;
		const { momentId } = ctx.query
		
		for (let file of files) {
			//2.将图像数据保存到数据库中
			const { mimetype, filename, size } = file
			await createPicture(filename,mimetype,  size, momentId, id);
			ctx.body = "动态配图上传完成";
		}
	}
}
module.exports = new FileController();
