const {createConnection} = require('mysql');
const Crypto = require('../util/cryptoUtil');
require("dotenv").config();

class MainDao{
    #connection;

    //생성자
    constructor(){
        this.#connection = createConnection({
            host: process.env.DB_HOST, // 호스트 주소
            user: process.env.DB_USER, // mysql user
            password: process.env.DB_PASS, // mysql password
            database: process.env.DB_NAME, // mysql 데이터베이스
        });
        this.#connection.connect();
    }

    //데이터베이스 연결해제
    disconnectDatabase(){
        this.#connection.end();
    }

    //유저정보 요청
    async requestUserdata(email){
        return new Promise((resolve) => {
            this.#connection.query(`SELECT email,password FROM user_data where email = '${connection.escape(email)}'`, function (err, result) {
                if(err){
                console.log(err);
                resolve(false);
                }
                console.log(result);
                if(result.length === 0){
                resolve(false);
                }
                resolve(result);
            })
        })
    }

    //패스워드 솔트 요청
    async requestPasswordsalt(email){
        return new Promise((resolve) => {
            this.#connection.query(`SELECT password_salt FROM user_data where email = '${connection.escape(email)}'`, async function (err, result) {
                if(err){
                console.log(err);
                resolve(false);
                }
                if(result.length === 0){
                resolve(false);
                }
                resolve(result[0].password_salt);
            });
        });
    }

    //유저정보 확인
    async checkUserdata(email,password,passwordSalt){
        if(passwordSalt === false){
            return false;
        }
        const hashPassword = await Crypto.hashPassword(password,passwordSalt);
        return new Promise((resolve) => {
            this.#connection.query(`SELECT email FROM user_data where email = '${connection.escape(email)}' and password = '${connection.escape(hashPassword)}'`, function (err, result) {
                if(err){
                    console.log(err);
                    resolve(false);
                }
                console.log(result)
                if(result.length === 0)resolve(false);
                resolve(true);
            });
        });
    }

    //유저정보 저장
    async saveUserdata(email,password){
        const passwordSalt = await Crypto.createSalt();
        const hashPassword = await Crypto.hashPassword(password,passwordSalt);
        return new Promise((resolve) => {
            this.#connection.query(`INSERT INTO user_data (email,password,password_salt) VALUES ('${connection.escape(email)}','${connection.escape(hashPassword)}','${connection.escape(passwordSalt)}')`,async function (err) {
                if (err) {
                    console.log(err)
                    resolve(false);
                }
                resolve(true);
            });
        });
    }

    //이메일 중복 검사
    async checkEmailOverlap(email){
        return new Promise((resolve) => {
            this.#connection.query(`SELECT email FROM user_data where email = '${connection.escape(email)}'`, function (err, result) {
                if(err){
                    console.log(err);
                    resolve(true);
                }
                console.log(result)
                if(result.length > 1)resolve(true);
                resolve(false);
            });
        });
    }

    //유정정보 삭제
    async deleteUserdata(email){
        return new Promise((resolve) => {
            this.#connection.query(`UPDATE user_data SET is_deleted = 1 ,deleted_at = CURRENT_TIMESTAMP WHERE email = '${connection.escape(email)}'`, async function (err) {
                if (err) {
                    console.log(err);
                    resolve(false);
                }
                resolve(true);
            });
        });
    }

    //유저정보 수정
    async changeUserdata(email,changeEmail){
        return new Promise((resolve) => {
            this.#connection.query(`UPDATE user_data SET email = '${connection.escape(changeEmail)}' WHERE email = '${connection.escape(email)}'`, async function (err) {
                if (err) {
                    this.#connection.end();
                    resolve(false);
                }
                this.#connection.end();
                resolve(true);
            });
        });
    }

    //비밀번호 수정
    async changePassword(email,password){
        const passwordSalt = await Crypto.createSalt();
        const hashPassword = await Crypto.hashPassword(password,passwordSalt);
        return new Promise((resolve) => {
            this.#connection.query(`UPDATE user_data SET password = '${connection.escape(hashPassword)}' ,password_salt = '${connection.escape(passwordSalt)}' WHERE email = '${connection.escape(email)}'`, async function (err) {
                if (err) {
                    console.log(err);
                    resolve(false);
                }
                resolve(true);
            });
        });
    }

    //삭제된 계정 체크
    async checkDeleted(email){
        return new Promise((resolve) => {
            this.#connection.query(`SELECT is_deleted FROM user_data where email = '${connection.escape(email)}'`, function (err, result) {
                if(err){
                    console.log(err);
                    resolve(true);
                }
                if(result[0].is_deleted === 0){
                    resolve(false)
                }
                resolve(true);
            });
        });
    }
}

module.exports = {MainDao};
