//内置的加密插件
const crypto = require('crypto')
const md5password = (password) => {
  const md5 = crypto.createHash('md5')//生成MD5摘要的哈希对象
  //update将输入消息添加到哈希对象，digest 方法生成最终的哈希摘要,hex表示转换为16进制
  const result = md5.update(password).digest('hex') 
  return result
}
module.exports=md5password