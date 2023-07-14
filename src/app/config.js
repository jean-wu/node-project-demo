const fs = require("fs");
const path = require("path");
const PRIVATE_KEY = fs.readFileSync(
	path.resolve(__dirname, "./keys/private.key")
);
const PUBLICE_KEY = fs.readFileSync(
	path.resolve(__dirname, "./keys/public.key")
);
//读取环境变量
const dotenv = require("dotenv");
dotenv.config();
module.exports = process.env;
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLICE_KEY = PUBLICE_KEY;
