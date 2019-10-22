var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();

router.get('*', function(req, res, next){

	if(req.cookies['username'] != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/userlist', function(req, res){

		userModel.getAll(function(results){
			if(req.cookies['username'] != null){
				res.render('user/index', {user: results});
			}else{
				res.redirect('/login');
			}
		});
});


router.get('/adduser', function(req, res){
	res.render('user/adduser');
});

router.post('/adduser', function(req, res){

	var user = {
		emp_name: req.body.emp_name,
		company_name: req.body.company_name,
		contact_no: req.body.contact_no,
		username: req.body.username,
		password: req.body.password
	};

	userModel.insert(user, function(status){
		if(status){
			res.redirect('/user/userlist');
		}else{
			res.redirect('/user/adduser');
		}
	});
});

router.get('/edit/:id', function(req, res){

	userModel.getById(req.params.id, function(results){
		//console.log(results);
		res.render('user/edit', {user: results});		
	});

});

router.post('/edit/:id', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password,
		id: req.params.id
	};

	userModel.update(user, function(status){

		if(status){
			res.redirect('/user/userlist');
		}else{
			res.redirect('/user/adduser');
		}
	});
});

router.get('/delete/:id', function(req, res){

	userModel.getById(req.params.id, function(results){
		//console.log(results);
		res.render('user/edit', {user: results});		
	});

});

router.post('/delete/:id', function(req, res){

	userModel.delete(req.params.id, function(results){
		//console.log(results);
		res.render('user/edit', {user: results});		
	});

});

router.get('/details/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('user/details', {user: result});
	});
});

module.exports = router;
