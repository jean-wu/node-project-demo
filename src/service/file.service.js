const connection = require("../app/database");
class FileService {
	async createAvatar(mimetype, filename, size, userId) {
		const sql = `INSERT INTO avatar (filename,mimetype, size,user_id) VALUES (?,?,?,?);`;
		const [result] = await connection.execute(sql, [
			filename,
			mimetype,
			size,
			userId,
		]);
		return result;
	}
	async createPicture(filename, mimetype, size, momentId, userId) {
		const sql = `INSERT INTO file (filename,mimetype, size,moment_id,user_id) VALUES (?,?,?,?,?);`;
		const [result] = await connection.execute(sql, [
			filename,
			mimetype,
			size,
			momentId,
			userId,
		]);
		return result;
	}
	async getFileByFileName(filename) {
		const sql = `SELECT * FROM file WHERE filename=?;`;
		const [result] = await connection.execute(sql, [filename]);
		return result[0];
	}
}
module.exports = new FileService();
