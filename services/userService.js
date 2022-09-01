const mainDao = require(`../Dao/mainDao`);

const referenceUserdata = async function(request, response){
    if(!request.session.login){
        return response.redirect(`/user/login`);
    }
    const userData = await mainDao.getUserdata(request.session.login);
    if(userData === 0){response.send(`잘못된 접근입니다.`)}
    else{response.json(userData);}
}

const login = async function(request, response){
    const userEmail = request.body.email;
    const userPassword = request.body.password;
    if(request.session.login){
        return response.redirect(`/user`);
    }
    if(await mainDao.checkLogindata(userEmail,userPassword) >= 0){
        request.session.login = userEmail;
        return response.redirect(`/user`);
    }
}

const signup = async function(request, response){
    if(request.session.login){
        return response.redirect(`/user`)
    }
    const userEmail = request.body.email;
    const userPassword = request.body.password;
    const checkPassword = request.body.checkPassword;
    if(userPassword !== checkPassword){
        return response.send(`비밀번호가 일치하지 않습니다.`)
    }
    if(userPassword < 5){
        return response.send(`비밀번호가 짧습니다.`);
    }
    if(userEmail.length < 5){
        return response.send(`이메일이 짧습니다.`);
    }
    if(await mainDao.saveUserdata !== 1){
        return response.send(`데이터베이스 오류`);
    }
    return response.send(`회원가입 성공`);
}

const changeUserdata = async function(request, response){
    if(!request.session.login){
        return response.redirect(`/user/login`);
    }
    if(request.body.changeEmail < 5){
        return response.send(`이메일이 너무 짧습니다.`)
    }
    if(await mainDao.changeUserdata(request.session.login,request.body.changeEmail) !== 1){
        return response.send(`데이터베이스 오류`);
    }
    return response.send(`변경 완료`);
}

const deleteUserdata = async function(request, response){
    if(!request.session.login){
        return response.redirect(`/user/login`);
    }
    if(await mainDao.deleteUserdata(request.session.login) !== 1){
        return response.send(`데이터베이스 오류`);
    }
    request.session.destory(function(){
        request.session.login;
    })
    return response.send(`삭제 완료`);
}

const changePassword = async function(request, response){
    if(!request.session.login){
        return response.redirect(`/user/login`);
    }
    if(request.body.changePassword < 5){
        return response.send(`비밀번호가 너무 짧습니다.`)
    }
    if(await mainDao.changePassword(request.session.login, request.body.changePassword) !== 1){
        return response.send(`데이터베이스 오류`);
    }
    return response.send(`비밀번호 변경 완료`)
}

module.exports ={
    referenceUserdata,
    login,
    signup,
    changeUserdata,
    deleteUserdata,
    changePassword
}