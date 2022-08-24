const express = require('express');
const {createServer} = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mainRouter = require(`../routers/mainRouter`);
const userRouter = require(`../routers/userRouter`);
const {requestApi, userDatabase, checkApi } = require(`../DAOs/mainDAO`);

//서버를 실행시킴//
const runServer = function () {
  const app = express();
  setApp(app);
  const server = createServer(app).listen(80);
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

module.exports = {
  runServer: runServer,
};
