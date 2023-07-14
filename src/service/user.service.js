//对数据库的操作
const connection = require('../app/database')
class UserService { 
  async create(user) {
    const {name,password}=user
    const sql = 'INSERT INTO user (name,password) VALUES (?,?)'
    //数据插入操作
    const result=await connection.execute(sql,[name,password])
    return result
  }
  async getUserByName(user) { 
    const { name } = user
    //查询用户信息
    const sql = 'SELECT * FROM user WHERE name = ?;';
    const result = await connection.execute(sql, [name])
    return result[0]
  }
  async getAvatarById(userId) {
    const sql = 'SELECT * FROM avatar WHERE user_id = ?;';
    const [result] = await connection.execute(sql, [userId])
    return result[0]
  }
  async updateAvatarUrlById(avatarUrl,userId) { 
    const sql = 'UPDATE user SET avatar_url=? WHERE id=?';
    const [result] = await connection.execute(sql, [avatarUrl,userId])
    return result
  }
}
module.exports=new UserService()