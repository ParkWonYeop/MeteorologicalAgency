const {createConnection} = require('mysql');
const request = require('request');

//데이터베이스 연결//
const userDatabase = async function () {
  const connection = createConnection({
    host: process.env.DB_HOST, // 호스트 주소
    user: process.env.DB_USER, // mysql user
    password: process.env.DB_PASS, // mysql password
    database: process.env.DB_NAME, // mysql 데이터베이스
  });
  connection.connect();
  return connection;
};

const checkUserdata = async function(connection,ID,PW){
  await connection.query(`SELECT ID,PW,Email FROM user_data where ID = ${ID} and PW = ${PW}`, async function (err, result) {
      if(err){
          return 1;
      }
      return 0;
  });
}
p

const setUserdata = async function(connection,ID,PW,Email){
  await connection.query(`INSERT INTO user_data (ID,PW,Email) VALUES (${ID},${PW},${Email})`,function (err) {
      if (err) {
          return 1;
      }
          return 0;
      },
  );
}

const deleteUserdata = async function(connection,ID,PW){
  await connection.query(`DELETE FROM user_data where ID = ${ID} and PW = ${PW}`,async function (err) {
      if (err) {
          return 1
      }
      return 0;
      },
    );
}

module.exports = {
  userDatabase,
  checkApi,
  requestApi,
  checkError,
  getWeatherinformation,
  getAreainformation,
  setUserdata,
  deleteUserdata,
  checkUserdata
};

