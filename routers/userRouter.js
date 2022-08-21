const express = require('express');
const {getUser,postUser,putUser,deleteUser} = require(`../controllers/loginController`)

const userRouter = express.Router();

userRouter.get('/',getUser);
userRouter.get('/',postUser);
userRouter.get('/',putUser);
userRouter.get('/',deleteUser);

module.exports = userRouter;
