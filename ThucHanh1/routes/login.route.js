var express = require('express');
var router = express.Router();
var controller = require('../controllers/login.controller');

router.get('/login',controller.login);

router.post('/login',controller.postLogin);
router.post('/loggin',controller.postLoggin);

module.exports = router;
