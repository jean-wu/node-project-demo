const {
	create,
	replay,
	update,
	remove,
	getCommentsByMomentId
} = require("../service/comment.service");
class CommentController {
	async create(ctx, next) {
		const { momentId, content } = ctx.request.body;
		const { id } = ctx.user;
		let result = await create(momentId, content, id);
		ctx.body = result;
	}
	async replay(ctx, next) {
		let { momentId, content } = ctx.request.body;
		const { commentId } = ctx.params;
		const { id } = ctx.user;
		let result = await replay(momentId, commentId, content, id);
		ctx.body = result;
	}
	async update(ctx, next) {
		let { content } = ctx.request.body;
		const { commentId } = ctx.params;
		
		let result = await update(commentId, content);
		ctx.body = result;
	}
	async remove(ctx, next) {
		const { commentId } = ctx.params;
		let result = await remove(commentId );
		ctx.body = result;
	}
	async list(ctx, next) { 
		const { momentId } = ctx.query;
		let result = await getCommentsByMomentId(momentId );
		ctx.body = result;
	}
}
module.exports = new CommentController();
