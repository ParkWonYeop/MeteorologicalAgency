const userService = require(`../services/userService`)

const referenceUserdata = async function(request, response){
    userService.referenceUserdata(request,response);
}

const login = async function(request, response){  
    userService.login(request, response);
}

const signup = async function(request, response){
    userService.signup(request, response);
}

const changeUserdata = async function(request, response){
    userService.changeUserdata(request, response);
}

const deleteUserdata = async function(request, response){
    userService.deleteUserdata(request, response);
}

const changePassword = async function(request, response){
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