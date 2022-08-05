const { run_server,run_api } = require("./function/main_function.js");
const { user_database } = require("./function/api_function");
const connection = user_database();
run_server();
run_api(connection);