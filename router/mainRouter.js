const express = require('express');
const {mainContorller} = require(`../controller/mainController`)

const router = express.Router();

router.get('/main', function (req, res) {
  mainContorller(res);
});

module.exports = router;
