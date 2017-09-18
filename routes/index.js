
/* GET home page. */

module.exports =(app,path,config)=>{
	app.get('/', function(req, res, next) {
	  res.sendFile(path.resolve(__dirname,'public','index.html'))
	});

	app.listen(config.server.port,function(){
		console.log("application is listening on port",config.server.port);
	})
};
