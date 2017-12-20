const adminModal = require('../models/admin.js');

module.exports =(app,path,config)=>{
	var user;
	app.post('/adminUser',function(req,res){
       admin = req.body;
       adminModal.find({userName:admin.userName,password:admin.password},function(err,user){
       	if(err){
       		throw err;
       	}
       	console.log("admin user ",user);
       	if(user.length > 0){
       		res.json({status:true,id:user[0]._id,name:user[0].userName});
       	}else{		
       	   res.json({status:false});
       	}
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