
module.exports =(io)=>{
	let users = {};
	io.sockets.on('connection', (socket) => {
	    socket.on('message',(data) => {
	    	let channel = data.room;
	    	let conn;
	    	console.log("====data===",data);
	    	switch(data.type){
	    		case "create or join":
	    		 // First client joining...
	    		   if(users[data.connectedUser]){
                        socket.emit('message', {
		                	type:'alreadySignedIn',
		                	success:true
		                });
	    		   }
		           if(io.sockets.adapter.rooms[channel]){
		           	 let numClients = io.sockets.adapter.rooms[channel].length; 
			           if (numClients == 1) {
				            io.sockets.in(channel).emit('join', channel);
				            socket.join(channel);
				            conn = users["adminId"];
				            conn.emit('message', {
				            	type:'joined',
				            	success:true,
				            	connected:data.connectedUser
				            });
				            socket.emit('message', {
			                	type:'joined',
			                	success:true
			                });
				        } else { // max two clients
				            socket.emit('full', channel);
				        }
		           	
		            }else{
		            	socket.join(channel);
		                socket.emit('message', {
		                	type:'created',
		                	success:true
		                });
		            }
		            socket.name = data.connectedUser;
		            users[data.connectedUser] = socket;
		            break;
		        case "candidate" :
		            console.log("===users=====",users,"===data.connectedUser===",data.connectedUser);
		            conn = users[data.connectedUser];
		            if(conn !== null){
		            	conn.emit('message',{
		            		type:'candidate',
		            		candidate:data.candidate
		            	})
		            }
		            break;   
		        case "offer":
		             conn = users[data.connectedUser];
		             console.log("======conn=====",conn);
		             if(conn != null){
                       socket.otherName = data.connectedUser;
                       conn.emit('message',{
                       	 type:'offer',
                       	 offer:data.offer,
                       	 name:socket.name
                       })
		             }
		             break;
		        case "answer":
		             conn = users[data.connectedUser];
		             if(conn != null){
		             	socket.otherName = data.connectedUser;
		             	conn.emit('message',{
		             		type:'answer',
		             		answer:data.answer
		             	})
		             }
		             break;     
	    	}
          
	    });
	 
    });
}	


