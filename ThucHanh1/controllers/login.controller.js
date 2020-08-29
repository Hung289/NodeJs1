var md5 = require('md5');
var shortid = require('shortid');
var db = require('../db.js');


module.exports.login = (req, res)=>{
    res.render('login/login');
}

module.exports.postLogin = (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({ email : email}).value();

    if(!user){
        res.render('login/login',{
            errors: [
                'User is not exists'
            ],
            values: req.body
        });
        return;
    }

    var hashedPassword = md5(password);
    if(user.password !== hashedPassword){
        res.render('login/login',{
            errors: [
                'Wrong password'
            ],
            values: req.body            
        });
        return;
    }
    res.cookie('userId',user.id,{
        signed: true
    });
    res.redirect('/users');
}

module.exports.postLoggin = (req, res)=>{
    req.body.id = shortid.generate();
	// var newPart = 'uploads'.concat('/',req.file.filename);
	// req.body.avatar = newPart;
	db.get('users').push(req.body).write()
    res.redirect('/users');
}
