const fs = require("fs");
const {
	create,
	getMomentById,
	getMomentList,
	updateMomentById,
	removeMomentById,
	hasLabel,
	addLabel,
} = require("../service/moment.service");
const { getFileByFileName } = require("../service/file.service");
class MomentController {
	async create(ctx, next) {
		const userId = ctx.user.id;
		const content = ctx.request.body.content;
		const result = await create(userId, content);
		ctx.body = result;
	}
	async detail(ctx, next) {
		const momentId = ctx.params.momentId;
		const result = await getMomentById(momentId);
		ctx.body = result;
	}
	async list(ctx, next) {
		const { offset, size } = ctx.query;
		const result = await getMomentList(offset, size);
		ctx.body = result;
	}
	async update(ctx, next) {
		const { momentId } = ctx.params;
		const { content } = ctx.request.body;
		const result = await updateMomentById(momentId, content);
		ctx.body = result;
	}
	async remove(ctx, next) {
		const { momentId } = ctx.params;
		const result = await removeMomentById(momentId);
		ctx.body = result;
	}
	async addLabels(ctx, next) {
		const { momentId } = ctx.params;
		const { labels } = ctx;
		ctx.body = "添加标签";
		for (let label of labels) {
			//判断动态中是否已经存在同样的标签
			const isExist = await hasLabel(momentId, label.id);
			if (!isExist) {
				//如果不存在，则添加标签
				await addLabel(momentId, label.id);
			}
		}
		ctx.body = "添加标签成功";
	}
	async fileInfo(ctx, next) {
		let { filename } = ctx.params;
		const fileInfo = await getFileByFileName(filename);
		const { type } = ctx.query;
		const types = ["small", "middle", "large"];
		if (types.some((item) => item === type)) {
			filename = filename + "-" + type;
		}
		console.log(filename)
		ctx.response.set("content-type", fileInfo.mimetype);
		ctx.body = fs.createReadStream(`./uploads/picture/${filename}`);
	}
}
module.exports = new MomentController();
