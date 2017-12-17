
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
				            conn = users[data.adminId];
				            conn.emit('message', {
				            	type:'joined',
				            	success:true,
				            	adminId:data.adminId,
				            	clientId:data.clientId
				            });
				            socket.emit('message', {
			                	type:'joined',
			                	success:true,
			                	adminId:data.adminId,
				            	clientId:data.clientId
			                });
			                socket.name = data.clientId;
			                users[data.clientId] = socket;
				        } else { // max two clients
				            socket.emit('full', channel);
				        }
				        
		           	
		            }else{
		            	socket.join(channel);
		                socket.emit('message', {
		                	type:'created',
		                	success:true,
		                	adminId:data.adminId,
				            clientId:data.clientId
		                });
		                socket.name = data.adminId;
		                users[data.adminId] = socket;
		            }
		            
		            
		            break;
		        case "candidate" :
		            conn = users[data.callee];
		            if(conn !== null){
		            	conn.emit('message',{
		            		type:'candidate',
		            		candidate:data.candidate
		            	})
		            }
		            break;   
		        case "offer":
		             conn = users[data.callee];
		             console.log("======conn=====",conn);
		             if(conn != null){
                       socket.otherName = data.callee;
                       conn.emit('message',{
                       	 type:'offer',
                       	 offer:data.offer,
                       	 caller:data.callee,
                       	 callee:data.caller
                       })
		             }
		             break;
		        case "answer":
		             conn = users[data.callee];
		             if(conn != null){
		             	socket.otherName = data.callee;
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


