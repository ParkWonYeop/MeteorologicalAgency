const {getUserService,postUserService,deleteUserService,putUserService} = require(`../services/userService`)

const getUser = async function(res,req){
    getUserService(res);
}
const postUser = async function(res,req){
    postUserService(res,req);
}
const deleteUser = async function(res,req){
    deleteUserService(res,req);
}

const putUser = async function(res,req){
    putUserService(res,req);
}

module.exports = {
    getUser:getUser,
    postUser:postUser,
    deleteUser,deleteUser,
    putUser,putUser
}