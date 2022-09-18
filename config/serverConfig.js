const express = require('express');
const {createServer} = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const cors = require('cors');
const userRouter = require(`../routers/userRouter`);
const logger = require(`./winston`);

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
  app.use('/user',userRouter);

  app.use(session({
    secret : `housecleanparty`,
    resave : false,
    saveUninitialized : true,
    store : new MemoryStore({checkPeriod : 600000}),
    cookie : {
      maxAge:600000
    },
  }))

  app.listen(3000, () => {
    logger.info('Server listening on port 3000');
  });

  console.log('server is running...');
};

module.exports = {
  runServer: runServer,
};
