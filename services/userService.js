const mainDao = require(`../Dao/mainDao`);
const logger = require(`../config/winston`);
const { check } = require("prettier");

const referenceUserdata = async function(request, response){
    const responseUserdata = async function(result){
        if(result === 1){
            logger.error('fail refernceUserdata');
            return response.sendStatus(500);
        }
        logger.info('GET /user');
        return response.send(result);
    }
    await mainDao.requestUserdata(request.params.email,responseUserdata);
}

const login = async function(request, response){
    const loginCheck = async function(checkError){
        if(checkError == 0){
            logger.error('login fail login');  
            return response.sendStatus(500)
        }
        logger.info('post /user/login');
        return response.send(`로그인 성공`);
    }
    const userEmail = request.body.email;
    const userPassword = request.body.password;
    mainDao.requestPasswordsalt(userEmail,userPassword,loginCheck);
}

const signup = async function(request, response){
    const userEmail = request.body.email;
    const userPassword = request.body.password;
    const checkPassword = request.body.checkPassword;
    console.log(userEmail);
    if(userPassword !== checkPassword){
        logger.error('signup not equal password');
        return response.sendStatus(500)
    }
    if(userPassword.length < 5){
        logger.error('signup too short password');
        return response.sendStatus(500)
    }
    if(userEmail.length < 5){
        logger.error('signup too short email');
        return response.sendStatus(500)
    }
    const checkError = await mainDao.saveUserdata(userEmail,userPassword);
    if(checkError === 0){
        logger.info('post /user/signup');
        return response.send(`회원가입 성공`);
    }
    logger.error('signup Database error');
    return response.sendStatus(500)
}

const changeUserdata = async function(request, response){
    const responseChange = async function(checkError){
        if(checkError === 1){
            logger.error('changeUserdata Database error');
            return response.sendStatus(500);
        }
        logger.info('put /user change');
        return response.send(`변경 완료`);
    }

    if(request.body.changeEmail < 5){
        logger.error('changeUserdata too short email');
        return response.sendStatus(500);
    }
    await mainDao.changeUserdata(request.body.email,request.body.changeEmail,responseChange); 
}

const deleteUserdata = async function(request, response){
    const checkError = await mainDao.deleteUserdata(request.params.email);
    if(checkError === 1){
        logger.error('deleteUserdata Database error');
        return response.sendStatus(500);
    }
    logger.info('put /user delete');
    return response.send(`삭제 완료`);
}

const changePassword = async function(request, response){
    if(request.body.changePassword < 5){
        logger.error('changePassword too short password');
        return response.sendStatus(500).send(`비밀번호가 너무 짧습니다.`);
    }
    const checkError = await mainDao.changePassword(request.body.email, request.body.changePassword)
    if(checkError === 1){
        logger.error('changePassword Database error');
        return response.sendStatus(500);
    }
    logger.info('put /user/password');
    return response.send(`비밀번호 변경 완료`);
}

module.exports ={
    referenceUserdata,
    login,
    signup,
    changeUserdata,
    deleteUserdata,
    changePassword
}