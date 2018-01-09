module.exports =(io,emitter)=>{
	let users = [];
	io.on('connection', (socket) => {
	    socket.on('message',(data) => {
	    	let channel = data.room;
	    	let conn;
	    	console.log("======data.type====",data.type);
	    	switch(data.type){
                case 'create or join':
                  if(data.userType === 'admin'){
                        emitter.broadcast.emit('message', {
		                	type:'created',
		                	success:true,
		                	adminId:data.adminId,
				            clientId:data.clientId,
				            sendTo:'admin'
		                });
                  }else if(data.userType === 'client'){
                        emitter.broadcast.emit('message', {
		                	type:'joined',
			                success:true,
			                adminId:data.adminId,
				            clientId:data.clientId,
				            sendTo:'admin'
		                });
                  }
                break;
                case "ringing" :
                    	emitter.broadcast.emit('message',{
                      		type:'ringing',
                      		caller:data.callee,
                      	    callee:data.caller,
                      	    sendTo:'client'
                     	});
		        break
		        case "acceptCall" :
                      	emitter.broadcast.emit('message',{
                      		type:'acceptCall',
                      		caller:data.callee,
                      		callee:data.caller,
                      		sendTo:'admin'
                      	})
		        break; 
		        case "offer":
                       emitter.broadcast.emit('message',{
                       	 type:'offer',
                       	 offer:data.offer,
                       	 caller:data.callee,
                       	 callee:data.caller,
                       	 sendTo:'client'
                       });
		             break;
		        case "answer":
		             	emitter.broadcast.emit('message',{
		             		type:'answer',
		             		answer:data.answer,
		             		sendTo:'admin'
		             	})
		             break;      
		        case "leave" : 
		                emitter.broadcast.emit('message',{
                  	    	type:'leave',
                  	    	sendTo:data.userType
                  	    });
                break;
                case "candidate" :
		            	emitter.broadcast.emit('message',{
		            		type:'candidate',
		            		candidate:data.candidate,
		            		sendTo:data.userType
		            	})
		            break;  	    
	    	}
	    });
	});
}