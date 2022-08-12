const express = require('express');
const {main_contorller} = require(`../controller/main_controller`)

const router = express.Router();

router.get('/main', function (req, res) {
  main_contorller(res);
});

module.exports = router;
