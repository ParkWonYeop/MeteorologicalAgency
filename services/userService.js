//const mainDao = require(`../Dao/mainDao`);
const {MainDao} = require(`../Dao/mainDao`);
const logger = require(`../config/winston`);
const {maxLength} = require(`../config/etcConfig`);

class UserService{
    #request;
    #response;

    //생성자
    constructor(request,response){
        this.#request = request;
        this.#response = response;
    }

    //유저정보 요청
    async referenceUserdata(){
        const mainDao = new MainDao();
        const isDeleted = await mainDao.checkDeleted(this.#request.params.email);
        if(isDeleted === true){
            logger.error('fail refernceUserdata is_deleted');
            return this.#response.sendStatus(500);
        }
        const result = await mainDao.requestUserdata(this.#request.params.email);
        mainDao.disconnectDatabase();
        if(result === false){
            logger.error('fail refernceUserdata');
            return this.#response.sendStatus(500);
        }
        logger.info('GET /user');
        return this.#response.send(result);
    }

    //로그인
    async login(){
        const mainDao = new MainDao();
        const isDeleted = await mainDao.checkDeleted(this.#request.body.email);
        if(isDeleted == true){
            logger.error('login fail is_deleted');
            return this.#response.sendStatus(500);
        }
        const passwordSalt = await mainDao.requestPasswordsalt(this.#request.body.email);
        const loginCheck = await mainDao.checkUserdata(this.#request.body.email,this.#request.body.password,passwordSalt);
        mainDao.disconnectDatabase();
        if(loginCheck == false){
            logger.error('login fail login');  
            return this.#response.sendStatus(500)
        }
        logger.info('post /user/login');
        return this.#response.send(`로그인 성공`);
    }

    //회원가입
    async signup(){
        const mainDao = new MainDao();
        const userEmail = this.#request.body.email;
        const userPassword = this.#request.body.password;
        const checkPassword = this.#request.body.checkPassword;
        const overlapEmail = await mainDao.checkEmailOverlap(userEmail);

        if(overlapEmail > true){
            logger.error('signup overlap email');
            return this.#response.sendStatus(500);
        }

        console.log(userEmail);

        if(userPassword !== checkPassword){
            logger.error('signup not equal password');
            return this.#response.sendStatus(500)
        }
        if(userPassword.length < maxLength.password){
            logger.error('signup too short password');
            return this.#response.sendStatus(500)
        }
        if(userEmail.length < maxLength.email){
            logger.error('signup too short email');
            return this.#response.sendStatus(500)
        }

        const checkError = await mainDao.saveUserdata(userEmail,userPassword);
        mainDao.disconnectDatabase();

        if(checkError === true){
            logger.info('post /user/signup');
            return this.#response.send(`회원가입 성공`);
        }

        logger.error('signup Database error');
        return this.#response.sendStatus(500)
    }

    //유저정보 변경
    async changeUserdata(){
        const mainDao = new MainDao();

        const overlapEmail = await mainDao.checkEmailOverlap(this.#request.body.changeEmail);

        if(overlapEmail > true){
            logger.error('changeUserdata overlap email');
            return this.#response.sendStatus(500);
        }
        if(this.#request.body.changeEmail == undefined){
            logger.error('changeUserdata changeEmail is undefined');
            return this.#response.sendStatus(500);
        }
        if(this.#request.body.changeEmail < maxLength.email){
            logger.error('changeUserdata too short email');
            return this.#response.sendStatus(500);
        }
        
        const checkError = await mainDao.changeUserdata(this.#request.body.email,this.#request.body.changeEmail);
        mainDao.disconnectDatabase();

        if(checkError === false){
            logger.error('changeUserdata Database error');
            return this.#response.sendStatus(500);
        }
        logger.info('put /user change');
        return this.#response.send(`변경 완료`);
    }

    //삭제
    async deleteUserdata(){
        const mainDao = new MainDao();
        const checkError = await mainDao.deleteUserdata(this.#request.params.email);
        mainDao.disconnectDatabase();
        console.log(checkError)
        if(checkError === false){
            logger.error('deleteUserdata Database error');
            return this.#response.sendStatus(500);
        }
        logger.info('put /user delete');
        return this.#response.send(`삭제 완료`);
    }

    //비밀번호 변경
    async changePassword(){
        const mainDao = new MainDao();
        if(this.#request.body.changePassword < maxLength.password){
            logger.error('changePassword too short password');
            return this.#response.sendStatus(500).send(`비밀번호가 너무 짧습니다.`);
        }
        const checkError = await mainDao.changePassword(this.#request.body.email, this.#request.body.changePassword)
        mainDao.disconnectDatabase();
        if(checkError === false){
            logger.error('changePassword Database error');
            return this.#response.sendStatus(500);
        }
        logger.info('put /user/password');
        return this.#response.send(`비밀번호 변경 완료`);
    }
}

module.exports = {UserService};
