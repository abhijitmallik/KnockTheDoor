
/* GET home page. */
const employees = require('../models/employees.js');
module.exports =(app,path,config)=>{
	var emp;
	app.get('/', function(req, res, next) {
	  res.sendFile(path.resolve(__dirname,'public','index.html'))
	});

	app.listen(config.server.port,function(){
		console.log("application is listening on port",config.server.port);
	})

	app.post('/employee',function(req,res){
		emp = req.body;
		employees.create(emp,function(err,emps){
			if(err){
				throw err;
			}
			res.json(emps);
		})
	})

	app.get('/employees',function(req,res){
		employees.find(function(err,books){
            if(err){
            	throw err;
            }
            res.json(books);
		})
	})

	app.delete('/employee/:_id',function(req,res){
		var query = {_id: req.params._id}; 
		employees.remove(query,function(err,books){
			if(err){
				throw err;
			}
			res.json(books);
		})
	})

};
