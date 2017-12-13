export function adminUserLogin(state = {status:false},action){
	switch(action.type){
		case 'LOGIN-USER':
		  state = action.payload;
		break;  
	}
	return state;
}