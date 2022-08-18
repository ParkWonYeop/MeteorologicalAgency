const express = require('express');
const {createServer} = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require(`../router/mainRouter`);
const {request_api, user_database: userDatabase, set_date: setDate, set_time: setTime, check_api} = require('./apiFunction');

//서버를 실행시킴//
const runServer = function () {
  const app = express();
  setApp(app, router);
  const server = createServer(app).listen(80);
  runApi();
};

const setApp = function (app, router) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use('/', router);
  console.log('server is running...');
};

//API에 데이터를 지속적으로 요청함//
const runApi = async function () {
  const connection = await userDatabase();
  let baseDate = await setDate();
  let baseTime = await setTime();
  request_api(connection, baseDate, baseTime);
  setInterval(function () {
    baseTime = check_api(connection, baseTime);
  }, 600000);
};

module.exports = {
  runServer: runServer,
};
