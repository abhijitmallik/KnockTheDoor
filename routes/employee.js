
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

	app.put('/editemployee',function(req,res){
		emp = req.body;
		console.log("update information",emp.id);
		 employees.update({_id: emp.id}, emp, function(err, obj) {
		    if (err) {
		      res.send(err);
		    }
		    res.send(obj);
		  });
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

	app.post('/userLogin',function(req,res){
       emp = req.body;
       employees.find({firstname:emp.username,password:emp.password},function(err,user){
       	if(err){
       		throw err;
       	}
       	if(user.length > 0){
       		res.json({status:true,id:user[0]._id,firstname:user[0].firstname,lastname:user[0].lastname,age:user[0].age,
       		         occupation:user[0].occupation,city:user[0].city,state:user[0].state,
       		         phone:user[0].phone,pin:user[0].pin,email:user[0].email,dateOfJoin:user[0].dateOfJoin,croppedImage:user[0].croppedImage});
       	}else{
       		res.json({status:false,id:null});
       	}
       	
       })
	})

};
