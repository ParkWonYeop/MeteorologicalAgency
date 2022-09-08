const crypto = require('crypto');

const createSalt = async function(){
  return crypto.randomBytes(128).toString(`base64`);
}

const hashPassword = async function(password,salt){
  return crypto.createHash(`sha512`).update(password+salt).digest(`base64`);
}

module.exports ={
  createSalt,
  hashPassword
}