const {createConnection} = require('mysql');
const etcFunc = require('../function/etcFunction');
require("dotenv").config();

//데이터베이스 연결//
const connectDatabase = async function () {
  const connection = createConnection({
    host: process.env.DB_HOST, // 호스트 주소
    user: process.env.DB_USER, // mysql user
    password: process.env.DB_PASS, // mysql password
    database: process.env.DB_NAME, // mysql 데이터베이스
  });
  connection.connect();
  return connection;
};

const requestUserdata = async function(email,response){
  const connection = await connectDatabase();
  connection.query(`SELECT email,password FROM user_data where email = '${email}'`, function (err, result) {
    if(err){
      console.log(err);
      connection.end();
      return response(1)
    }
    connection.end();
    console.log(result);
    if(result.length === 0){
      return response(1)
    }
    return response(result);
  });
}

const requestPasswordsalt = async function(email,password,response,loginCheck){
  const connection = await connectDatabase();
  connection.query(`SELECT password_salt FROM user_data where email = '${email}'`, async function (err, result) {
    if(err){
      console.log(err);
      connection.end();
      return 1;
    }
    connection.end();
    if(result.length === 0){
      return loginCheck(response,0);
    }
    return checkUserdata(email,password,result[0].password_salt,response,loginCheck);
  });
}

const checkUserdata = async function(email,password,passwordSalt,response,loginCheck){
  const connection = await connectDatabase()
  const hashPassword = await etcFunc.hashPassword(password,passwordSalt);
  connection.query(`SELECT email FROM user_data where email = '${email}' and password = '${hashPassword}'`, function (err, result) {
      if(err){
        connection.end();
        console.log(err);
        return loginCheck(response,0)
      }
      connection.end();
      console.log(result)
      return loginCheck(response,result.length);
  });
}

const saveUserdata = async function(email,password){
  const connection = await connectDatabase()
  const passwordSalt = etcFunc.createSalt();
  const hashPassword = etcFunc.hashPassword(password,passwordSalt);
  connection.query(`INSERT INTO user_data (email,password,password_salt) VALUES ('${email}','${hashPassword}','${passwordSalt}')`,async function (err) {
      if (err) {
        console.log(err)
        connection.end();
        return 1;
      }
      connection.end();
      return 0;
      },
  );
}

const deleteUserdata = async function(email){
  const connection = await connectDatabase()
  connection.query(`DELETE FROM user_data where email = '${email}'`, async function (err) {
    if (err) {
      connection.end();
      console.log(err);
      return 1;
    }
    connection.end();
    return 0;
  }
  );
}

const changeUserdata = async function(email,changeEmail,response){
  const connection = await connectDatabase()
  connection.query(`UPDATE user_data SET email = '${changeEmail}' WHERE email = '${email}';`, async function (err) {
    if (err) {
      connection.end();
      return response(1);
    }
    connection.end();
    return response(0);
  }
  );
}

const changePassword = async function(email,password){
  const connection = await connectDatabase()
  const passwordSalt = await etcFunc.createSalt();
  const hashPassword = await etcFunc.hashPassword(password,passwordSalt);
  connection.query(`UPDATE user_data SET password = '${hashPassword}' ,password_salt = '${passwordSalt}' WHERE email = '${email}'`, async function (err) {
    if (err) {
      connection.end();
      console.log(err);
      return 1;
    }
    connection.end();
    return 0;
  }
  );
}

module.exports = {
  requestUserdata,
  connectDatabase,
  saveUserdata,
  deleteUserdata,
  checkUserdata,
  changePassword,
  changeUserdata,
  requestPasswordsalt
};

