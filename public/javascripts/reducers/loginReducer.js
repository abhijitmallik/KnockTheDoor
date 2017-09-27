export function showLogin(state={showLogin:false},action){
	console.log("reached",action);
    switch(action.type){
    	case 'VIEW-LOGIN' : 
    	 state = {showLogin : action.payload};
    	break; 
    }
    return state;
}