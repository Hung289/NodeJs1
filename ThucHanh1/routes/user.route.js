var express = require('express');
var router = express.Router();
var multer = require('multer');


var controller = require('../controllers/user.controller');
var validate = require('../validation/user.validate');
var authMiddleware = require('../middlewares/auth.middlewares');

var upload = multer({ dest: './public/uploads/'})

router.get('/',controller.index);

router.get('/cookie', function(req, res, next){
    res.cookie('user-id',123456);
    res.send('hello'); 
})

router.get('/create',controller.viewCreate)

router.get('/search',controller.search);

router.post('/create',
    upload.single('avatar'),
    validate.postCreate, 
    controller.postCreate
);

router.get('/:id',controller.detail);

module.exports = router;