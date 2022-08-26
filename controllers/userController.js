const {getUserService,postUserService,deleteUserService,putUserService} = require(`../services/userService`)

const getUser = async function(request, response){
    getUserService(response);
}
const postUser = async function(request, response){
    postUserService(request, response);
}
const deleteUser = async function(request, response){
    deleteUserService(request, response);
}

const putUser = async function(request, response){
    putUserService(request, response);
}

module.exports = {
    getUser:getUser,
    postUser:postUser,
    deleteUser,deleteUser,
    putUser,putUser
}