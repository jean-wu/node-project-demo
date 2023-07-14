const connection=require('../app/database')
class LableService { 
  async create(name) {
    const sql = `INSERT INTO label (name) VALUES (?)`
    const [result] = await connection.execute(sql, [name])
    return result
  }
  async getLabelByName(name) { 
    const sql = `SELECT * FROM label WHERE name = ?;`
    const [result] = await connection.execute(sql, [name])
    return result[0]
  }
  async getLabels(limit,offset) { 
    const sql = `SELECT * FROM label LIMIT ?,?;`
    const [result] = await connection.execute(sql, [offset,limit])
    return result
  }
}
module.exports=new LableService()