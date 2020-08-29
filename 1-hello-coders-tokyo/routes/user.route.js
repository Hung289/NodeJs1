var express = require('express');
var router = express.Router();
var db = require('../db');
router.get('/:id',(req, res)=>{
	var id = parseInt(req.params.id);
	// console.log (typeof id);
	var user = db.get('users').find({ id: id}).value();
	res.render('users/view',{
		user: user
	});
})

router.get('/', (req, res)=>{
	res.render('users/index',{
		users : db.get('users').value()
	});
})

router.get('/search', (req, res)=>{
	var q = req.query.q;
	var matchedUsers = db.get('users').filter((user)=>{
		return user.name.indexOf(q) !== -1;
	});
	res.render('users/index',{
		users : matchedUsers	 
	})
})

router.get('/create',(req, res)=>{
	res.render('users/create');
})

router.post('/create',(req, res)=>{
	db.get('users').push(req.body).write();
	// console.log(req.body);
	res.redirect('/users');
})




module.exports = router;