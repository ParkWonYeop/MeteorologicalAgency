const express = require('express');
const {createServer} = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mainRouter = require(`../routers/mainRouter`);
const userRouter = require(`../routers/userRouter`);
const {setDate, setTime} = require('./etcFunction');
const {requestApi, userDatabase, checkApi } = require(`../DAOs/mainDAO`);

//서버를 실행시킴//
const runServer = function () {
  const app = express();
  setApp(app);
  const server = createServer(app).listen(80);
  runApi();
};

const setApp = function (app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use('/', mainRouter);
  app.use('/user',userRouter);
  console.log('server is running...');
};

//API에 데이터를 지속적으로 요청함//
const runApi = async function () {
  const connection = await userDatabase();
  let baseDate = await setDate();
  let baseTime = await setTime();
  requestApi(connection, baseDate, baseTime);
  setInterval(function () {
    baseTime = checkApi(connection, baseTime);
  }, 600000);
};

module.exports = {
  runServer: runServer,
};
