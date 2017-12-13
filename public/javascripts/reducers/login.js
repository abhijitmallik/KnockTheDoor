export function userLogIn(state={enable:false,id:null},action){
    switch(action.type){
    	case 'LOGGEDIN' :
         state = {enable:action.payload.status,userData:action.payload.userData};
         break;
    }
    return state;
}
export function editUser(state={enable:false},action){
	switch(action.type){
		case 'EDIT-USER':
			console.log("=======action type edit====",action);
			state = {enable:action.payload.status};
			break;
	}
	return state;
}