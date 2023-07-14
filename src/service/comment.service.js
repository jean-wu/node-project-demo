const connection = require("../app/database");
class CommentService {
	async create(momentId, content, user_id) {
		const sql = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?)`;
		const [result] = await connection.execute(sql, [
			content,
			momentId,
			user_id,
		]);
		return result;
	}
	async replay(momentId, commentId, content, id) {
		const sql = `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?);`;
		const [result] = await connection.execute(sql, [
			content,
			momentId,
			id,
			commentId,
		]);
		return result;
  }
  async update(commentId, content) {
		const sql = `UPDATE comment SET content=? WHERE id=?`;
		const [result] = await connection.execute(sql, [
			content,
			commentId,
		]);
		return result;
  }
  async remove( commentId) {
		const sql = `DELETE FROM comment WHERE id=?`;
		const [result] = await connection.execute(sql, [commentId]);
		return result;
	}
	async getCommentsByMomentId(momentId) { 
		const sql = `SELECT 
		m.id, m.content,m.comment_id commentId,m.createAt createTime,
		JSON_OBJECT('id',u.id,'name',u.name) user
		FROM comment m
		LEFT JOIN user u ON u.id=m.user_id  
		WHERE moment_id=?`;
		const [result] = await connection.execute(sql, [momentId]);
		return result;
	}
}
module.exports = new CommentService();
