export function userLogin(state = {},action){
	switch(action.type){
		case 'LOGIN-USER':
		  state = action.payload;
		break;  
	}
	return state;
}