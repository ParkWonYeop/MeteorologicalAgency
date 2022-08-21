const { deleteUserdataModel,setUserdataModel,checkUserdataModel} = require("../models/userModel");

const getUserService = async function(res,req){
    res.send("로그인페이지");
}
const postUserService = async function(res,req){
    const error = await checkUserdataModel(req.body.ID,req.nody.PW);
    if(error === 1)res.send("로그인 실패");
    res.send("로그인 성공");
}
const deleteUserService = async function(res,req){
    const error = await deleteUserdataModel(req.body.ID,req.body.PW);
    if(error === 1)res.send("오류");
    res.send("성공");
}

const putUserService = async function(res,req){
    const error = await setUserdataModel(req.body.ID,req.body.PW,req.body.Email);
    if(error === 1)res.send("오류");
    res.send("성공");
}

module.exports ={
    getUserService,
    postUserService,
    deleteUserService,
    putUserService
}