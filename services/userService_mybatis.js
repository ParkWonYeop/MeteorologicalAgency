//const mainDao = require(`../Dao/mainDao`);
const {MainDao} = require(`../Dao/mainDao_mybatis`);
const {UserDto} = require(`../Dto/userDto`)
const {errorCode,maxLength} = require(`../config/etcConfig`);
const crypto = require('../util/cryptoUtil');
const logger = require(`../config/winston`);

class UserService_mybatis{
    #request;
    #response;

    constructor(request,response){
        this.#request = request;
        this.#response = response;
    }

    async referenceUserdata(){
        const mainDao = new MainDao;
        const userDto = new UserDto(this.#request.params.email);
        const userEmail = await userDto.getUserEmail();
        
        const userData = await mainDao.getUserdata(userEmail);

        if(userData === errorCode.dbError){
            logger.error('referenceUserdata dbError');
            return this.#response.sendStatus(500);
        }
        if(userData === errorCode.noResult){
            logger.error('referenceUserdata noResult');
            return this.#response.sendStatus(500);
        }

        logger.info('GET /user');
        this.#response.send(userData);
    }

    async login(){
        const mainDao = new MainDao;
        const userDto = new UserDto(this.#request.body.email,this.#request.body.password);

        const userEmail = await userDto.getUserEmail();
        const userPassword = (await userDto.getUserPassword()).userPassword;
        const passwordSalt = (await mainDao.getPasswordSalt(userEmail))[0].password_salt;

        if(passwordSalt === errorCode.dbError){
            logger.error('login salt dbError');
            return this.#response.sendStatus(500);
        }
        if(passwordSalt === errorCode.noResult){
            logger.error('login salt noResult');
            return this.#response.sendStatus(500);
        }

        const hashPassword = await crypto.hashPassword(userPassword,passwordSalt);

        userDto.setUserPassword(hashPassword);
        const userData = await userDto.getUserData();
        const checkLogin = await mainDao.login(userData);

        if(checkLogin === errorCode.dbError){
            logger.error('login dbError');
            return this.#response.sendStatus(500);
        }
        if(checkLogin === errorCode.noResult){
            logger.error('login noResult');
            return this.#response.sendStatus(500);
        }

        logger.info('post /user/login');
        return this.#response.send(`로그인 성공`);
    }

    async signup(){
        const mainDao = new MainDao;
        const userDto = new UserDto(this.#request.body.email,this.#request.body.password);
        const checkPassword = this.#request.body.checkPassword;
        const userPassword = (await userDto.getUserPassword()).userPassword;
        const userEmail = await userDto.getUserEmail()
        const overlapEmail = await mainDao.getUserdata(userEmail);

        if(overlapEmail !== errorCode.noResult){
            logger.error('signup overlap email');
            return this.#response.sendStatus(500);
        }
        if(userPassword !== checkPassword){
            logger.error('signup not equal password');
            return this.#response.sendStatus(500)
        }
        if(userPassword.length < maxLength.password){
            logger.error('signup too short password');
            return this.#response.sendStatus(500)
        }
        if(userEmail.userEmail.length < maxLength.email){
            logger.error('signup too short password');
            return this.#response.sendStatus(500)
        }

        const userData = userDto.getUserData();
        const checkError = mainDao.signup(userData);

        if(checkError === errorCode.dbError){
            logger.error('signup Database error');
            return this.#response.sendStatus(500)
        }

        logger.info('post /user/signup');
        return this.#response.send(`회원가입 성공`);
    }
}

module.exports = {UserService_mybatis};