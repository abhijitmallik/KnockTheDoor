export  function getEmployees(state = {employees:[]},action){
	switch(action.type){
		case 'GET_BOOKS':
		state = {employees:[action.payload]};
		break;
	}
	return state;
}