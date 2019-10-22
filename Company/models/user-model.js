var db = require('./db');

module.exports={

	getById: function(id, callback){

		var sql = "select * from company where id=?";
		db.getResults(sql, [id], function(result){

			//console.log(result);
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from login where username=? and password=?";

		db.getResults(sql, [user.username, user.password], function(result){

			if(result.length > 0 ) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from company";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	insert : function(user, callback){
		var sql = "insert into company values('', ?, ?, ?, ?, ?)";
		db.execute(sql, [user.emp_name, user.company_name, user.contact_no, user.username, user.password], function(status){
			callback(status);
		});
	},
	insert : function(user, callback){
		var sql = "delete from company where id = ?";
		db.execute(sql, [user.id], function(status){
			callback(status);
		});
	},
	update : function(user, callback){
		var sql = "update user set username=?, password=? where id=?";		
			db.execute(sql, [user.username, user.password, user.id], function(status){
				callback(status);
			});
		
	},
	delete : function(user, callback){
		//var sql = "insert into user values('','"+ user.username+"', '"+user.password+"')";
		db.execute(sql, [],  function(status){
			callback(status);
		});
	}
}	


