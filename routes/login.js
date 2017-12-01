const adminModal = require('../models/admin.js');

module.exports =(app,path,config)=>{
	var user;
	app.post('/adminUser',function(req,res){
       admin = req.body;
       adminModal.find({userName:admin.userName,password:admin.password},function(err,user){
       	if(err){
       		throw err;
       	}
       	console.log(user);
       	res.json(user);
       })
	})

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