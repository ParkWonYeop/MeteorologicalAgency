const {UserService} = require(`../services/userService`);
const {UserService_mybatis} = require(`../services/userService_mybatis`);

class UserController{
    #request;
    #response;
    
    //생성자
    constructor(request,response){
        this.#request = request;
        this.#response = response;
    }

    //유저정보 요청
    async referenceUserdata(){
        const userService = new UserService_mybatis(this.#request,this.#response);
        await userService.referenceUserdata();
    }

    //로그인
    async login(){ 
        const userService = new UserService_mybatis(this.#request,this.#response);
        await userService.login();
    }

    //회원가입
    async signup(){
        const userService = new UserService_mybatis(this.#request,this.#response);
        await userService.signup();
    }

    //유저정보 수정
    async changeUserdata(){
        const userService = new UserService(this.#request,this.#response);
        await userService.changeUserdata();
    }

    //유저정보 삭제
    async deleteUserdata(){
        const userService = new UserService(this.#request,this.#response);
        await userService.deleteUserdata();
    }

    //비밀번호 변경
    async changePassword(){
        const userService = new UserService(this.#request,this.#response);
        await userService.changePassword();
    }
}

module.exports = {UserController}