const content = require('../models/content.js');
module.exports = (app,path,config) => {
	app.post("/saveContent",function(req,res){
       let body = req.body;
       content.create(body,function(err,desc){
			if(err){
				throw err;
			}
			console.log("=========desc=======",desc);
			res.json(desc);
		})
       
	});
	app.get("/getContents",function(req,res){
		content.find(function(err,desc){
            if(err){
            	throw err;
            }
            res.json(desc);
		})
	})
}