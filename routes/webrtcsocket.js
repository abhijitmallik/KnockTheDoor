
module.exports =(io)=>{
	let users = [];
	io.on('connection', (socket) => {
	    socket.on('message',(data) => {
	    	let channel = data.room;
	    	let conn;
	    	console.log("=====data.type====",data.type);
	    	console.log("=====users length=====",Object.keys(users).length);
	    	console.log("=====users=====",users);
	    	switch(data.type){
	    		case "create or join":
	    		 // First client joining...
	    		   if(users[data.connectedUser]){
                        socket.emit('message', {
		                	type:'alreadySignedIn',
		                	success:true
		                });
	    		   }
		           if(Object.keys(users).length > 0){
		           	 let numClients = Object.keys(users).length; 
		           	 console.log("===========numClients==========",numClients);
		           	 console.log("=====users=====",users);
			           if (numClients == 1) {
				            io.sockets.in(channel).emit('join', channel);
				            socket.join(channel);
				            conn = users[data.adminId];
				             if(conn !== null){
				             	conn.emit('message', {
					            	type:'joined',
					            	success:true,
					            	adminId:data.adminId,
					            	clientId:data.clientId
					            });
				             }
				            
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
		        case "ringing" :
                      conn = users[data.callee];
                      if(conn !== null){
                      	conn.emit('message',{
                      		type:'ringing',
                      		caller:data.callee,
                      		callee:data.caller
                      	})
                      }
		             break;  
		        case "acceptCall" :
		              conn = users[data.callee];
                      if(conn !== null){
                      	conn.emit('message',{
                      		type:'acceptCall',
                      		caller:data.callee,
                      		callee:data.caller
                      	})
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
		             if(conn != null){
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
		             	conn.emit('message',{
		             		type:'answer',
		             		answer:data.answer
		             	})
		             }
		             break;  
		        case "leave":
		             conn = users[data.callee];    
		             if(conn != null){
		             	conn.emit('message',{
		             		type:'leave',
		             		caller:data.caller,
                            callee:data.callee
		             	})
		             	delete users[data.caller];
		             	delete users[data.callee];
		             	users = [];
		             }
		             break;    
		        case "terminate":
		             var clientsLength = Object.keys(users).length;
		             if(clientsLength > 0){
		             	for(var i=0;i<clientsLength;i++){
		             		delete users[Object.keys(users)];
		             	}
		             	users = [];
		             }      
	    	}
          
	    });
	 
    });
}	


