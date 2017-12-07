export  function getEmployees(state = {employees:[]},action){
	switch(action.type){
		case 'GET_ALL_EMPLOYEES':
		state = {employees:[action.payload]};
		break;
	}
	return state;
}