const {getUserEmailModel,getUserIDModel,getUserPWModel,getUserdataModel} = require(`../models/userModel`);

const userData = {
    ID : "",
    PW : "",
    Email:""
};

const userDTO = async function(){
    userData.ID = getUserIDModel();
    userData.PW = getUserPWModel();
    userData.Email = getUserEmailModel();
}

const setUserID= async function(){
    userData.ID = getUserIDModel();
}

const setUserPW = async function(){
    userData.PW = getUserPWModel();
}

const setUserEmail = async function(){
    userData.Email = getUserEmailModel();
}

const getUserID= async function(){
    return userData.ID;
}
const getUserPW = async function(){
    return userData.PW;
}

const getUserEmail = async function(){
    return userData.Email;
}

module.exports = {
    userDTO,
    setUserEmail,
    setUserID,
    setUserPW,
    getUserEmail,
    getUserID,
    getUserPW
}