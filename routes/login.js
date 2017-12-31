const adminModal = require('../models/admin.js');
module.exports =(app,path,config,passport)=>{
	var user;
    app.post('/adminUser',function(req,res,next){
        passport.authenticate('adminsignup',{
	       failureRedirect: '/'
	    },function(obj){
	    	res.json(obj);
	    })(req,res,next);
    });
	app.post('/createAdmin',function(req,res){
		admin = req.body;
		adminModal.create(admin,function(err,user){
			if(err){
				throw err;
			}
			res.json(user);
		})
	})
}