const connection = require("../app/database");
class AuthService {
	async checkResource(id, userId, tableName) {
		let sql = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
		const [result] = await connection.execute(sql, [id, userId]);
		return result.length !== 0 ?? true;
	}
}
module.exports = new AuthService();
