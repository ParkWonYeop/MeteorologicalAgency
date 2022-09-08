const express = require('express');
const userController = require(`../controllers/userController`)

const userRouter = express.Router();

userRouter.get('/:email',userController.referenceUserdata);
userRouter.post('/login',userController.login);
userRouter.post('/signup',userController.signup);
userRouter.put('/',userController.changeUserdata);
userRouter.post('/:email',userController.deleteUserdata);
userRouter.put('/password',userController.changePassword);

module.exports = userRouter;
