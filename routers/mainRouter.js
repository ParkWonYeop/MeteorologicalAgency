const express = require('express');
const {getMain} = require(`../controllers/mainController`)
const {getUser,postUser,putUser,deleteUser} = require(`../controllers/loginController`)

const mainRouter = express.Router();

mainRouter.get('/main',getMain);

module.exports = mainRouter;
