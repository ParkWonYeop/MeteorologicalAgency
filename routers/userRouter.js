const express = require('express');
const {UserController} = require(`../controllers/userController`)
const userRouter = express.Router();

userRouter.get('/:email',function(request,response){
    const userController = new UserController(request,response)
    userController.referenceUserdata();
});
userRouter.post('/login',function(request,response){
    const userController = new UserController(request,response)
    userController.login();
});
userRouter.post('/signup',function(request,response){
    const userController = new UserController(request,response)
    userController.signup();
});
userRouter.put('/',function(request,response){
    const userController = new UserController(request,response)
    userController.changeUserdata();
});
userRouter.post('/:email',function(request,response){
    const userController = new UserController(request,response)
    userController.deleteUserdata();
});
userRouter.put('/password',function(request,response){
    const userController = new UserController(request,response)
    userController.changePassword();
});

module.exports = userRouter;
