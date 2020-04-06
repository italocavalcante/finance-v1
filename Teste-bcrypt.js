const hash = require('object-hash')
const bcrypt = require('bcryptjs')


console.log(bcrypt.hashSync("#Portus@Cale10"))
console.log(hash("#Portus@Cale10", { algorithm: 'md5', encoding: 'base64' }));