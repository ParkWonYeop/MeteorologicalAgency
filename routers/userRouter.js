const express = require('express');
const {getUser,postUser,putUser,deleteUser} = require(`../controllers/loginController`)

const userRouter = express.Router();

userRouter.get('/',getUser);
userRouter.post('/',postUser);
userRouter.put('/',putUser);
userRouter.delete('/',deleteUser);

module.exports = userRouter;
