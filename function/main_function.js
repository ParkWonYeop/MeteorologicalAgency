const express = require('express');
const {createServer} = require('http');
const body_parser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require(`../router/main_router`);
const {set_app} = require(`./web_function`);
const {request_api, user_database, set_date, set_time, check_api} = require('./api_function');

//서버를 실행시킴//
const run_server = function () {
  const app = express();
  set_app(app, router);
  const server = createServer(app).listen(80);
  run_api();
};

const set_app = function (app, router) {
  app.use(cors());
  app.use(body_parser.json());
  app.use(body_parser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use('/', router);
  console.log('server is running...');
};

//API에 데이터를 지속적으로 요청함//
const run_api = async function () {
  const connection = await user_database();
  let base_date = await set_date();
  let base_time = await set_time();
  request_api(connection, base_date, base_time);
  setInterval(function () {
    base_time = check_api(connection, base_time);
  }, 600000);
};

module.exports = {
  run_server: run_server,
};
