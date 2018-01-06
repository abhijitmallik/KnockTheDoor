const socketIo = require("socket.io");
const employees = require('../../models/employees.js');
module.exports.load =(server,path,config,redisConfig,redis,emitter)=>{
   const io = require('socket.io')(server);
   require('../webrtcsocket')(io,redisConfig);
   io.adapter(require('socket.io-redis')(redisConfig));
   let userLogin = [];
   io.on('connection', (client) => {
	  client.on('signin', (user) => {
      userLogin.push(user.id);
      client.broadcast.emit('onlineStatus',{"onlineUsers":userLogin});
	  }); 

     client.on('signout', (user) => {
      userLogin.splice(userLogin.indexOf(user.id),1);
      client.broadcast.emit('onlineStatus',{"onlineUsers":userLogin});
     }); 

     client.on('shareWhiteBoard',(user)=>{ 
      client.broadcast.emit('acceptWhiteBoardSharing',{id:user.id,adminId:user.adminId,canAcceptSession:user.show});
     });


    client.on('setcoordinates', (cord) => {
      client.broadcast.emit('getcoordinates',cord);
     });
   });

}

