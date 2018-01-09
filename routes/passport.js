const adminModal = require('../models/admin.js');
const LocalStrategy = require('passport-local').Strategy;
module.exports = (passport)=>{
    passport.serializeUser((user, cb)=> {
	  cb(null, user.id);
	});

	passport.deserializeUser((id, cb)=> {	
	  adminModal.findById(id, function (err, user) {
	    if (err) { return cb(err); }
	    cb(null, user);
	  });
	});
    passport.use('adminsignup',new LocalStrategy({
	    usernameField: 'userName',
	    passwordField: 'password',
	    passReqToCallback: true
	},(obj,userName,password,done) =>{
	  	adminModal.find({userName:obj.body.userName,password:obj.body.password},function(err,user){
	       	if(err){
	       		done({status:false});
	       	}
	       	if(user.length > 0){
	       		done({status:true,id:user[0]._id,name:user[0].userName});
	       	}else{		
	       	    done({status:false});
	       	}
        })
	  })
    );
}

