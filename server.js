 const _ = require('lodash');
 const config = require('./config/serverConfig'); 
 _.each(config.server.port,function(obj){
    require('./init')(obj,config);
 });

