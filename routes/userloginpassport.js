const employeeModal = require('../models/employees.js');
const LocalStrategy = require('passport-local').Strategy;
module.exports = (passport)=>{
    passport.serializeUser((user, cb)=> {
	  cb(null, user.id);
	});

	passport.deserializeUser((id, cb)=> {	
	  employeeModal.findById(id, function (err, user) {
	    if (err) { return cb(err); }
	    cb(null, user);
	  });
	});
    passport.use('usersignup',new LocalStrategy({
	    usernameField: 'username',
	    passwordField: 'password',
	    passReqToCallback: true
	},(obj,username,password,done) =>{
		console.log("call back method initiate");
	  	employeeModal.find({firstname:obj.body.username},function(err,user){
	  		//console.log("callback method here",user);
	       	if(err){
	       		done({status:false});
	       	}
	       	if(user.length > 0){
	       		done(user);
	       	}else{		
	       	    done({status:false});
	       	}
        })
	  })
    );
}

