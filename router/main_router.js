const express = require('express');
const router = express.Router();
const {main_contorller} = require(`../controller/main_controller`)

router.get('/main', function (req, res) {
  main_contorller(res);
});

module.exports = router;
