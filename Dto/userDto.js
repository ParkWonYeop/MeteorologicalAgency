class UserDto{
    #userEmail
    #userPassword

    constructor(userEmail,userPassword,passwordSalt){
        this.#userEmail = userEmail;
        this.#userPassword = userPassword;
    }

    async getUserEmail(){
        return {userEmail:this.#userEmail};
    }

    async getUserPassword(){
        return {userPassword:this.#userPassword};
    }

    async getUserData(){
        return {userEmail:this.#userEmail, userPassword:this.#userPassword};
    }

    setUserEmail(userEmail){
        this.#userEmail = userEmail;
    }

    setUserPassword(userPassword){
        this.#userPassword = userPassword;
    }
}

module.exports = {UserDto}