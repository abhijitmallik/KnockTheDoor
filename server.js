
const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');




const fs = require('fs');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'production')));



const uristring = config.dbURL + 'Employees';
mongoose.connect(uristring , function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      
      }
});

const userString = config.dbURL + 'Users';

mongoose.connect(uristring , function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + userString + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + userString);
      
      }
});
app.listen(config.server.port,function(){
    console.log("application is listening on port",config.server.port);
})
require('./routes/socketio')(app,path,config);
require('./routes/employee')(app,path,config);
require('./routes/login')(app,path,config);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



