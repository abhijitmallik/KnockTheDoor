
/* GET home page. */
const Employees = require('../models/employees.js');
const util = require('../util/util.js').util;
module.exports =(app,path,config)=>{
	let emp;
	app.get('/', function(req, res, next) {
	  res.sendFile(path.resolve(__dirname,'public','index.html'))
	});

	app.post('/employee',function(req,res){
		emp = req.body;
		let empObj = new Employees();
		emp.password = util.generateHash(emp.password);
		emp.reenterpassword = util.generateHash(emp.reenterpassword);
		Employees.create(emp,function(err,emps){
			if(err){
				throw err;
			}
			res.json(emps);
		})
	})

	app.get('/employees',function(req,res){
		Employees.find(function(err,emps){
			let objArr = [];
            if(err){
            	throw err;
            }
            for(let i=0;i<emps.length;i++){
            	let emp = emps[i];
            	objArr.push({_id:emp._id,firstname:emp.firstname,lastname:emp.lastname,
            	age:emp.age,occupation:emp.occupation,dateOfJoin:emp.dateOfJoin,city:emp.city,state:emp.state,croppedImage:emp.croppedImage,online:emp.online,canAcceptSession:emp.canAcceptSession});
            }
            res.json(objArr);
		})
	})

	app.put('/editemployee',function(req,res){
		emp = req.body;
		console.log("update information",emp.id);
		 Employees.update({_id: emp.id}, emp, function(err, obj) {
		    if (err) {
		      res.send(err);
		    }
		    res.json({status:true});
		  });
	})

	app.put('/deleteemployee',function(req,res){
		let query = {_id: req.body.id}; 
		Employees.remove(query,function(err,emp){
			if(err){
				throw err;
			}
			res.json(emp);
		})
	})

	app.post('/userLogin',function(req,res){
       emp = req.body;
       Employees.find({firstname:emp.username},function(err,user){
       	if(user.length > 0){
       		if(util.validPassword(emp.password,user[0].password)){
		       		res.json({status:true,id:user[0]._id,firstname:user[0].firstname,lastname:user[0].lastname,age:user[0].age,
		       		         occupation:user[0].occupation,city:user[0].city,state:user[0].state,
		       		         phone:user[0].phone,pin:user[0].pin,email:user[0].email,dateOfJoin:user[0].dateOfJoin,croppedImage:user[0].croppedImage});    
       		}else{
       			res.json({status:false,id:null});
       		}
       		
       	}else{

       	}
       	
       	
       })
	})

};
