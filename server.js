
const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);  
//const config = require('config');
const mongoose = require('mongoose');
const socketIo = require('./routes/socket');
const config = {server:{
                        port:process.env.PORT || 3000,
                        ioPort:56432 
                      },
                      dbURL:'mongodb://knockthedoor:laptoppc84@ds231245.mlab.com:31245/knockthedoor'};
const passport = require('passport');
const Cookies = require("cookies");
                      

//dbURL:'mongodb://127.0.0.1:27017/'
//mongodb://<dbuser>:<dbpassword>@ds231245.mlab.com:31245/knockthedoor

const fs = require('fs');

//app.engine('html', require('ejs').renderFile);
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
server.listen(config.server.port,function(){
    console.log("application is listening on port",config.server.port);
})
socketIo.socketId(server,path,config);
require('./routes/passport')(passport);
require('./routes/userloginpassport')(passport);
require('./routes/employee')(app,path,config,passport,Cookies);
require('./routes/login')(app,path,config,passport,Cookies);
require('./routes/saveContent')(app,path,config);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found',res);
  err.status = 404;
  next(err);
});



