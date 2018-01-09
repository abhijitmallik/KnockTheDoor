module.exports = (port,serverConfig)=>{
  const dbURL = serverConfig.dbURL;
  const express = require('express');
  const app = express();
  const path = require('path');
  const favicon = require('serve-favicon');
  const logger = require('morgan');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const server = require('http').createServer(app);  
  const mongoose = require('mongoose');
  const socketIo = require('./routes/socket');
  const config = {port:process.env.PORT || port,dbURL:dbURL};
  const passport = require('passport');
  const Cookies = require("cookies");
  const fs = require('fs');
  const redisConfig = serverConfig.redis;
  const emitter = require('socket.io-emitter')(redisConfig); 
    app.set('view engine', 'html');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static('public'));
    app.use(express.static(path.join(__dirname, 'production')));
    app.use(passport.initialize());
    app.use(passport.session());



    const uristring = config.dbURL;
    mongoose.connect(uristring , function (err, res) {
          if (err) {
          console.log ('ERROR connecting to: ' + uristring + '. ' + err);
          } else {
          console.log ('Succeeded connected to: ' + uristring);
          
          }
    });
    server.listen(config.port,function(){
        console.log("application is listening on port",config.port);
    })
    app.get('/', function(req, res, next) {
        res.sendFile(path.resolve(__dirname,'public','index.html'))
    });
    require('./routes/passport')(passport);
    require('./routes/userloginpassport')(passport);
    require('./routes/employee')(app,path,config,passport,Cookies);
    require('./routes/login')(app,path,config,passport,Cookies);
    require('./routes/saveContent')(app,path,config);
    //require('./config/nginx');
    //require.('./routes/socket/rabbitMQ')(server,path,config);
    socketIo.socketId(server,path,config,redisConfig,emitter);




    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      res.cookie('loggedin',util.cookies);
      var err = new Error('Not Found',res);
      err.status = 404;
      next(err);
    });
}




