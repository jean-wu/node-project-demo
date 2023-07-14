const connection = require("../app/database");
// const sqlFragment=`SELECT m.id,m.content content,m.createAt createTime,m.updateAt updateTime,
// 	JSON_OBJECT('id',u.id,'name',u.name) author
// 	FROM moment m
// 	LEFT JOIN user u ON m.user_id = u.id`
class MomentService {
	async create(userId, content) {
		const sql = `INSERT INTO moment (content,user_id) VALUES (?,?);`;
		const result = await connection.execute(sql, [content, userId]);
		return result[0];
	}
	async getMomentById(momentId) {
		try { 
			const sql = `
			SELECT 
			m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
			JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) author,
			IF(COUNT(l.id),JSON_ARRAYAGG(
				JSON_OBJECT('id',l.id,'name',l.name)
			),NULL) labels,
			(SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
				JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,
				'createTime',c.createAt,
								'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatarUrl',cu.avatar_url))
			),NULL)FROM comment c LEFT JOIN user cu ON c.user_id=cu.id WHERE m.id=c.moment_id) comments,
			(SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename))
			FROM file WHERE m.id=file.moment_id) images
			FROM moment m
			LEFT JOIN user u ON m.user_id = u.id
			LEFT JOIN moment_label ml ON m.id = ml.moment_id
			LEFT JOIN label l ON ml.label_id = l.id
				WHERE m.id=?
				GROUP BY m.id;
		`;
		const result = await connection.execute(sql, [momentId]);
		return result[0];
		} catch (err) { 
			console.log(err)
		}
		
	}
	async getMomentList(offset, size) {
		const sql = `SELECT 
		m.id,m.content content,m.createAt createTime,m.updateAt updateTime,
		JSON_OBJECT('id',u.id,'name',u.name) author,
		(SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
		(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
		(SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename))
			FROM file WHERE m.id=file.moment_id) images
		FROM moment m
		LEFT JOIN user u ON m.user_id = u.id
		LIMIT ?,?;`;
		const result = await connection.execute(sql, [offset, size]);
		return result[0];
	}
	async updateMomentById(momentId, content) {
		const sql = `UPDATE moment SET content = ? WHERE id =?;`;
		const [result] = await connection.execute(sql, [content, momentId]);
		return result;
	}
	async removeMomentById(momentId) {
		const sql = `DELETE FROM moment WHERE id = ?;`;
		const [result] = await connection.execute(sql, [momentId]);
		return result;
	}
	async hasLabel(momentId, labelId) {
		const sql = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id=?;`;
		const [result] = await connection.execute(sql, [momentId, labelId]);
		return result[0] ? true : false;
	}
	async addLabel(momentId, labelId) {
		const sql = `INSERT INTO moment_label(moment_id,label_id) VALUES (?,?);`;
		const [result] = await connection.execute(sql, [momentId, labelId]);
		return result;
	}
}
module.exports = new MomentService();
