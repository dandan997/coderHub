const cyrpto = require('crypto')
//crypto是node内置的加密模块

const md5password = (password)=>{
	const md5 = cyrpto.createHash('md5')
	const result = md5.update(password).digest('hex')
	return result
}

module.exports = {md5password}