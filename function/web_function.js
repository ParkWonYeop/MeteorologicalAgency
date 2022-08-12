const body_parser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const set_app = function (app, router) {
  app.use(cors());
  app.use(body_parser.json());
  app.use(body_parser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use('/', router);
  console.log('server is running...');
};

module.exports = {
  set_app: set_app,
};
