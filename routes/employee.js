
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
		employees.find(function(err,emps){
			var objArr = [];
            if(err){
            	throw err;
            }
            for(var i=0;i<emps.length;i++){
            	var emp = emps[i];
            	objArr.push({_id:emp._id,firstname:emp.firstname,lastname:emp.lastname,
            	age:emp.age,occupation:emp.occupation,dateOfJoin:emp.dateOfJoin,city:emp.city,state:emp.state,croppedImage:emp.croppedImage});
            }
            res.json(objArr);
		})
	})

	app.delete('/employee/:_id',function(req,res){
		var query = {_id: req.params._id}; 
		employees.remove(query,function(err,emp){
			if(err){
				throw err;
			}
			res.json(emp);
		})
	})

};
