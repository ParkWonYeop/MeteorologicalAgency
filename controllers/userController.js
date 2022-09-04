const userService = require(`../services/userService`)
const logger = require(`../config/winston`);

const referenceUserdata = async function(request, response){
    logger.info('GET /user');
    response.sendStatus(200);
    userService.referenceUserdata(request,response);
}

const login = async function(request, response){ 
    logger.info('post /user/login');
    response.sendStatus(200);
    userService.login(request, response);
}

const signup = async function(request, response){
    logger.info('post /user/signup');
    response.sendStatus(200);
    userService.signup(request, response);
}

const changeUserdata = async function(request, response){
    logger.info('put /user change');
    response.sendStatus(200);
    userService.changeUserdata(request, response);
}

const deleteUserdata = async function(request, response){
    logger.info('put /user delete');
    response.sendStatus(200);
    userService.deleteUserdata(request, response);
}

const changePassword = async function(request, response){
    logger.info('put /user/password');
    response.sendStatus(200);
    userService.changePassword(request, response);
}

module.exports = {
    referenceUserdata,
    login,
    signup,
    changeUserdata,
    changePassword,
    deleteUserdata
}