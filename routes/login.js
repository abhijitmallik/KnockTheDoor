const adminModal = require('../models/admin.js');
module.exports =(app,path,config,passport,Cookies)=>{
	var user;
	app.use((req, res, next) => {
        const cookiejar = new Cookies(req, res);
        const user = cookiejar.get("admin-user");
        if(req.url === "/adminLogout"){
        	res.clearCookie("admin-user");
        }
        if(typeof user == 'undefined'){
        	passport.authenticate('adminsignup',{
		       failureRedirect: '/'
		    },(obj)=>{
		    	if(obj !== null){
		    		if(obj.status === true){
	                  cookiejar.set("admin-user",JSON.stringify(obj));
			    	}
			    	res.json(obj);
		    	}
		    	
		    })(req,res,next);
        }else{
            res.json(JSON.parse(user));
        }
	});
	app.post('/createAdmin',(req,res)=>{
		admin = req.body;
		adminModal.create(admin,(err,user)=>{
			if(err){
				throw err;
			}
			res.json(user);
		})
	})
}