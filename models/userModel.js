const {getUserdata,getUserEmail,getUserID,getUserPW,setUserdata,deleteUserdata,checkUserdata} = require(`../DAOs/userDAO`)
const {userDatabase} = require(`../DAOs/mainDAO`);

const checkUserdataModel = async function(){
    const connection = await userDatabase();
    const error = await checkUserdata();

    connection.end();

    if(error === 1)return 1;
    return 0;
}

const getUserdataModel = async function(){
    const connection = await userDatabase();
    const userData = await getUserdata(connection);
    connection.end();

    if(userData === 1) return 1;

    return userData;
}

const getUserIDModel = async function(){
    const connection = await userDatabase();
    const userID = await getUserID(connection);
    connection.end();

    if(userID === 1) return 1;

    return userID;
}

const getUserPWModel = async function(){
    const connection = await userDatabase();
    const userPW = await getUserPW(connection);
    connection.end();

    if(userPW === 1) return 1;

    return userPW;
}

const getUserEmailModel = async function(){
    const connection = await userDatabase();
    const userEmail = await getUserEmail(connection);
    connection.end();

    if(userEmail === 1) return 1;

    return userEmail;
}

const setUserdataModel = async function(ID,PW,Email){
    const connection = await userDatabase();
    const error = await setUserdata(connection,ID,PW,Email);
    connection.end();

    if(error === 1)return 1;

    return 0;
}

const deleteUserdataModel = async function(ID,PW){
    const connection = await userDatabase();
    const error = await deleteUserdata(connection,ID,PW);
    connection.end();

    if(error === 1)return 1;

    return 0;
}

module.exports = {
    getUserEmailModel,
    getUserdataModel,
    getUserIDModel,
    getUserPWModel,
    setUserdataModel,
    deleteUserdataModel,
    checkUserdataModel
};