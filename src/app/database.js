const mysql2 = require('mysql2')
const config = require('./config')
//创建连接
const connection=mysql2.createPool({
  host: config.MYSQL_HOST,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})
//测试是否连接成功
connection.getConnection((err, con) => {
  if (err) {
    console.log('database connect err')
  } else {
    console.log('database connect success')
  }
})
module.exports=connection.promise()