const express = require('express');
const userController = require(`../controllers/userController`)

const userRouter = express.Router();

userRouter.get('/',userController.referenceUserdata);
userRouter.post('/login',userController.login);
userRouter.post('/signup',userController.signup);
userRouter.put('/',userController.changeUserdata);
userRouter.put('/',userController.deleteUserdata);
userRouter.put('/password',userController.changePassword);

module.exports = userRouter;
