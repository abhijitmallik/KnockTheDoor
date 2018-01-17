const content = require('../models/content.js');
module.exports = (app,path,config) => {
	console.log("call save content");
	app.post('/saveContent',function(req,res){
       let body = req.body;
       content.create(body,function(err,desc){
			if(err){
				throw err;
			}
			console.log("after saving contents",desc);
			res.json(desc);
		})
       
	});
	app.get('/getContents',function(req,res){
		content.find(function(err,desc){
            if(err){
            	throw err;
            }
            res.json(desc);
		})
	})
}