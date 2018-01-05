
/* GET home page. */
const Employees = require('../models/employees.js');
const util = require('../util/util.js').util;
module.exports =(app,path,config,passport,Cookies)=>{
	let emp;
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

	/*app.use((req, res, next) => {

		console.log("user logged in ",req.url);
		if(req.url == "/userLogin"){
			let cookiejar = new Cookies(req, res);
            let user = cookiejar.get("user-loggedin");
            if(typeof user != 'undefined'){
            	user = JSON.parse(user);
            	console.log("not undefined");
            	res.json({status:true,id:user[0]._id,firstname:user[0].firstname,lastname:user[0].lastname,age:user[0].age,
   		         occupation:user[0].occupation,city:user[0].city,state:user[0].state,
   		         phone:user[0].phone,pin:user[0].pin,email:user[0].email,dateOfJoin:user[0].dateOfJoin,croppedImage:user[0].croppedImage});    
            }else{
            	res.redirect("/userLogin");
            }
		}
	});*/

	app.post('/userLogin',function(req,res){
	   const cookiejar = new Cookies(req, res);
	   if(typeof cookiejar.get("user-loggedin") != 'undefined' && cookiejar.get("user-loggedin") != "undefined"){
	        	let user = JSON.parse(cookiejar.get("user-loggedin"));
            	res.json({status:true,id:user[0]._id,firstname:user[0].firstname,lastname:user[0].lastname,age:user[0].age,
   		         occupation:user[0].occupation,city:user[0].city,state:user[0].state,
   		         phone:user[0].phone,pin:user[0].pin,email:user[0].email,dateOfJoin:user[0].dateOfJoin,croppedImage:user[0].croppedImage});    
	   }else{
	   	console.log("else",req.body);
	   	   emp = req.body;
	       Employees.find({firstname:emp.username},function(err,user){
	       	passport.authenticate('usersignup',{
		       failureRedirect: '/'
		    },(obj)=>{
		    	if(obj.length > 0){
		    		if(util.validPassword(emp.password,obj[0].password)){
		    			        util.cookies.userLoogedIn = JSON.stringify(obj);
		    			        res.cookie('loggedin',obj,{ maxAge: 1000 * 60 * 10, httpOnly: false });
					       		res.json({status:true,id:obj[0]._id,firstname:obj[0].firstname,lastname:obj[0].lastname,age:obj[0].age,
					       		         occupation:obj[0].occupation,city:obj[0].city,state:obj[0].state,
					       		         phone:obj[0].phone,pin:obj[0].pin,email:obj[0].email,dateOfJoin:obj[0].dateOfJoin,croppedImage:obj[0].croppedImage});    
			       		}else{
			       			res.json({status:false,id:null});
			       		}
		    	}
		    	
		    })(req,res);
	       })
	   }
     
	})

};
