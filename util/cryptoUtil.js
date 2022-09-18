const crypto = require('crypto');

class Crypto{
    constructor(){
    }

    //솔트 생성
    async createSalt(){
        return crypto.randomBytes(128).toString(`base64`);
    }

    //비밀번호 암호화
    async hashPassword(password,salt){
        return crypto.createHash(`sha512`).update(password+salt).digest(`base64`);
    }
}

module.exports = new Crypto;