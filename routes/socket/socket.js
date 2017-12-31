const socketIo = require("socket.io");
const employees = require('../../models/employees.js');
module.exports.load =(server,path,config)=>{
   //const server = http.createServer(app);
   const io = require('socket.io')(server);
   let userLogin = [];
   //io.listen(config.server.ioPort);
   //io.configure(function () {  
      //io.set("transports", ["xhr-polling"]); 
      //io.set("polling duration", 10); 
  // });
   //console.log('io listening on port ', config.server.ioPort);
   require('../webrtcsocket')(io);
   io.on('connection', (client) => {
	  client.on('signin', (user) => {
      userLogin.push(user.id);
     // setInterval(() => {
           client.broadcast.emit('onlineStatus',{"onlineUsers":userLogin});
    //  }, 2000);
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

