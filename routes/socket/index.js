// author: Abhijit Mallik

var loadEndpoints = function(app,path,config,redisConfig,redis,emitter) {
    require('./socket').load(app,path,config,redisConfig,redis,emitter);
};

module.exports = {
    socketId: loadEndpoints
};