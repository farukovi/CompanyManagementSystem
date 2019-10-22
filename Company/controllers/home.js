var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();

router.get('/', function(req, res){

		var sql = "select * from user";
		db.getResults(sql, function(results){
			if(req.cookies['username'] != null){
				res.render('home/index', {user: results});
			}else{
				res.redirect('/login');
			}
		});
});

router.get('/test/:name/:id', function(req, res){

	res.send(req.params.id+ "|"+req.params.name)
})



module.exports = router;


