// author: Abhijit Mallik

var loadEndpoints = function(app,path,config) {
    require('./socket').load(app,path,config);
};

module.exports = {
    socketId: loadEndpoints
};