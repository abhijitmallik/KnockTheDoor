const socketIo = require("socket.io");
const employees = require('../../models/employees.js');
module.exports.load =(server,path,config,redisConfig,redis,emitter)=>{
   //const server = http.createServer(app);
   const io = require('socket.io')(server);
   io.adapter(redis(redisConfig));
   let userLogin = [];
   require('../webrtcsocket')(io);
   io.on('connection', (client) => {
	  client.on('signin', (user) => {
      userLogin.push(user.id);
           emitter.emit('onlineStatus',{"onlineUsers":userLogin});
           client.broadcast.emit('onlineStatus',{"onlineUsers":userLogin});
	  }); 

     client.on('signout', (user) => {
      userLogin.splice(userLogin.indexOf(user.id),1);
      emitter.emit('onlineStatus',{"onlineUsers":userLogin});
      client.broadcast.emit('onlineStatus',{"onlineUsers":userLogin});
     }); 

     client.on('shareWhiteBoard',(user)=>{ 
      emitter.emit('acceptWhiteBoardSharing',{id:user.id,adminId:user.adminId,canAcceptSession:user.show});
      client.broadcast.emit('acceptWhiteBoardSharing',{id:user.id,adminId:user.adminId,canAcceptSession:user.show});
     });


    client.on('setcoordinates', (cord) => {
      emitter.emit('getcoordinates',cord);
      client.broadcast.emit('getcoordinates',cord);
     });
   });

}

