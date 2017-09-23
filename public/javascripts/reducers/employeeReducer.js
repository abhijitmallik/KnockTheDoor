export default function(state = [],action){
	switch(action.type){
		case 'allEmployees':
		 return [action.payload];
	}
	return state;
}