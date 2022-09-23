const mysql = require(`mysql`);
const mybatisMapper = require(`mybatis-mapper`);
const {errorCode,maxLength} = require(`../config/etcConfig`);
require("dotenv").config();

class MainDao{
    #connection
    #format
    #query
    
    constructor(){
        this.#connection = mysql.createConnection({
            host: process.env.DB_HOST, // 호스트 주소
            user: process.env.DB_USER, // mysql user
            password: process.env.DB_PASS, // mysql password
            database: process.env.DB_NAME, // mysql 데이터베이스
        });
        mybatisMapper.createMapper(['./mapper/userMapper.xml'])
        this.#format = {language : 'sql', indent: '  '}
        this.#connection.connect();
    }

    disconnectDatabase(){
        this.#connection.end();
    }

    async getUserdata(param){
        this.#query = mybatisMapper.getStatement(`userData`, `getReferenceData`, param, this.#format);
        return new Promise((resolve) => {
            this.#connection.query(this.#query, function(error,result){
                if(error){
                    resolve(errorCode.dbError);
                }
                if(result.length === 0) resolve(errorCode.noResult);
                resolve(result);
            })
        })
    }

    async login(param){
        this.#query = mybatisMapper.getStatement(`userData`, `login`, param, this.#format);
        return new Promise((resolve) => {
            this.#connection.query(this.#query, function(error,result){
                if(error){
                    resolve(errorCode.dbError);
                }
                if(result.length === 0) resolve(errorCode.noResult);
                resolve(true);
            })
        })
    }

    async getPasswordSalt(param){
        this.#query = mybatisMapper.getStatement(`userData`, `getPasswordSalt`, param, this.#format);
        return new Promise((resolve) => {
            this.#connection.query(this.#query, function(error,result){
                if(error){
                    resolve(errorCode.dbError);
                }
                if(result.length == 0) resolve(errorCode.noResult);
                resolve(result);
            })
        })
    }

    async signup(param){
        this.#query = mybatisMapper.getStatement(`userData`, `signup`, param, this.#format);
        return new Promise((resolve) => {
            this.#connection.query(this.#query, function(error,result){
                if(error){
                    resolve(errorCode.dbError);
                }
                resolve(true);
            })
        })
    }
}

module.exports = {MainDao}