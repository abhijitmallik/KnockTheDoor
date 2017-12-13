const socketIo = require("socket.io");
const employees = require('../../models/employees.js');
const http = require("http");
module.exports.load =(app,path,config)=>{
   const server = http.createServer(app);
   const io = socketIo(server);
   io.listen(config.server.ioPort);
   console.log('io listening on port ', config.server.ioPort);
   require('../webrtcsocket')(io);
   io.on('connection', (client) => {
	  client.on('signin', (user) => {
	    client.broadcast.emit('onlineStatus');
	  }); 

     client.on('signout', (user) => {
      employees.update({_id: user.id}, user, function(err, obj) {
          if (err) {
            res.send(err);
          }
          client.broadcast.emit('onlineStatus');
        });
       
     }); 

     client.on('shareWhiteBoard',(user)=>{ 
        employees.update({_id:user.id},{canAcceptSession:user.show},function(err,obj){
          if(err){
            res.send(err);
          }
          client.broadcast.emit('onlineStatus');
        })
     });


    client.on('setcoordinates', (cord) => {
      client.broadcast.emit('getcoordinates',cord);
     });
   });

}

