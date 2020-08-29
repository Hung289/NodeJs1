var db = require('../db.js');




const shortid = require('shortid');

module.exports.index = (req, res)=>{
	res.render('users/index',{
		users : db.get('users').value()
	})
}

module.exports.search = (req, res)=>{
	var users = db.get('users').value();
	var q = req.query.q;
	var matchedUser = users.filter((x)=>{
		return x.name.indexOf(q) !== -1;
	})
	console.log(matchedUser);
	res.render('users/index',{
		users : matchedUser
	})
}

module.exports.detail = (req, res)=>{
	var id = req.params.id;
	const user = db.get('users').find({id:id}).value();
	res.render('users/view',{
		users : user
	})
}

module.exports.viewCreate = (req, res)=>{
	console.log(req.cookies)
	res.render('users/create')
}

module.exports.postCreate = (req, res)=>{
	
	req.body.id = shortid.generate();
	var newPart = 'uploads'.concat('/',req.file.filename);
	req.body.avatar = newPart;
	db.get('users').push(req.body).write()
	res.redirect('/users');
}